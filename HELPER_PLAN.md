# 助っ人1枠 (ライト混成 / ROADMAP rank22) 設計

## 前提メモ (調査結果)
- 作業ツリーは data.js 切り出し (rank21) が進行中: `TEAMS` / 全会話データは `src/data.js` (726行) へ移動済み、ロジックは `src/game.js` (現在4116行)。index.html が `data.js → game.js` の順に defer ロード。本設計はこの作業ツリー基準。
- 関連箇所の現在地 (game.js): `defaultProgress` は旧来 SAVE_KEY 周辺、`cloneTeam` は redistributeForFormation 直後、`startMatchCore` は `state.homeTeamId/awayTeamId` を代入**してから** `cloneTeam(findTeam(homeId), "home")` を呼ぶ、`renderSetup` L2822、`bindEvents` L3579、`resultDialogue` L3336、テストフック `window.__touhouSpellFutsalDebug` L3914。
- VN 話者解決は 2 系統あり安全性が異なる:
  - `renderVnScene` → `findRosterChar(panel.speaker)` はグローバル `TEAMS` 検索 → **誰をベンチにしてもクラッシュ/表示欠落はしない** (問題は物語整合のみ)。
  - `resultDialogue` は `team.players.find(speaker) || team.players[0]` → 話者がベンチだと**別人が代表セリフを喋る**事故が起きる (唯一の実害ポイント)。
  - 因縁VN (`RIVALRY_DIALOGUES`) は実フィールドの carrier/defender からのみ発火 → 居ないキャラは構造的に喋らない。`preMatchDialogue` は away 側のみ参照 → 助っ人 (home専用) の影響なし。
- `gainXp` は `player.id` キー・`side==="home"` 判定、`cloneTeam` の XPブースト/`applyClearReward` も side ベース → 助っ人にそのまま正しく乗る。
- `bindEvents` の data-select は home===away を禁止しているが、「助っ人の古巣 = away チーム」だと**同一キャラが両軍に立つ**新規問題が生まれる (例: 助っ人咲夜 vs 紅魔館)。

---

## (1) データモデル (progress 追加フィールド)

```js
// state.progress に1フィールド追加
helper: null | {
  teamId:   "kouma",    // 借り元 (unlockedTeams 内 & 使用中 home チームと別)
  playerId: "sakuya",   // 借りる選手 (借り元 members に実在)
  outId:    "cirno",    // ベンチへ下げる自チーム選手。同 role 必須。「ヒント」扱いで欠損可
}
```

- `defaultProgress()` に `helper: null` を追加。
- `loadProgress()` に検疫 `sanitizeHelper(parsed.helper, unlockedTeams)` を追加: 形状チェック / `teamId ∈ unlockedTeams` / `findTeam(teamId).members` に playerId 実在。不正なら null。**outId はロード時に検証しない** (free モードで home チームが変わると無効化しうるため、試合開始時に遅延解決)。
- `resetProgress()` は kept (audioMuted/difficulty/animSpeed) に helper を含めない → 自然に null へ戻る。
- 途中セーブ: `state.match` は clone 済み players のスナップショットなので resume はそのまま動く。追加プロパティ (`isHelper` 等) は additive で `loadMatch` の validSide 検査を壊さない → **MATCH_SAVE_SCHEMA は 2 のまま据え置き可**。
- UI 一時状態として `state.helperSrcTeamId` (借り元チームのピッカー展開用、非永続) を state 直下に追加。

## (2) cloneTeam への組み込み (入れ替え規則)

新規純関数 `resolveHelper(team, opponentId)` を作り、`cloneTeam` 冒頭で members を差し替える:

```js
function cloneTeam(team, side, opts = {}) {
  const helper = side === "home" ? resolveHelper(team, opts.opponentId) : null;
  const baseMembers = helper
    ? team.members.map(m => m.id === helper.out.id
        ? { ...helper.in, isHelper: true, originTeamId: helper.srcId, originTeamName: helper.srcName }
        : m)
    : team.members;
  const redistributed = redistributeForFormation(baseMembers, userFormation);
  ...
}
// startMatchCore 側: cloneTeam(findTeam(homeId), "home", { opponentId: awayId })
```

`resolveHelper` の規則 (上から順に null リターン = 助っ人なし):
1. `state.progress.helper` が null / sanitize 不合格 → なし。
2. `helper.teamId === team.id` (借り元=自チーム、free でチーム変更した場合) → なし。
3. **古巣戦ガード**: `helper.teamId === opponentId` → その試合のみ自動ベンチ (理由は (4))。
4. IN = 借り元 members から playerId。OUT 候補 = `team.members.filter(m => m.role === IN.role && !PROTECTED_SPEAKERS[team.id].has(m.id))`。候補ゼロ → なし。
5. OUT = 候補内に `outId` があればそれ、無ければ自動 (stat 合計最小の同 role)。

ポイント:
- **base role で同役割スワップ** → 各チームの 1GK/4DF/4MF/2FW が不変のまま `redistributeForFormation` に渡るので、4-3-3/3-5-2 の昇格降格ロジックは無改修で正しく動く。11人維持も自動。
- `TEAMS` (data.js) は一切ミューテートしない。差し替えは clone 時の配列コピーのみ。
- `teamName` は表示一貫性のため従来どおり home チーム名を入れ、バッジ表示用に `originTeamName` を別途持つ。
- XPブースト/霊力ボーナス/gainXp は side ベースなので無改修で助っ人に適用。
- `startMatchCore` でログ追加: 参戦時「助っ人: 咲夜 (紅魔館) が参戦。チルノはベンチ。」/ 古巣戦スキップ時「助っ人 咲夜は古巣・紅魔館との対戦のため今日はベンチ。」

`PROTECTED_SPEAKERS` (game.js 内の小テーブル): 各チーム `RESULT_DIALOGUES[id].speaker` (resultDialogue の fallback 事故防止、必須) + hakurei のみ STORY コア5 (reimu/marisa/sanae/youmu/suika) を追加 (推奨設定、(4)参照)。reimu=唯一のGK なので campaign では実質 GK 助っ人不可になる点を仕様として明記。

## (3) setup UI 案 (最小)

`renderSetup` の戦術 row と演出速度 row の間に 1〜3 行を追加 (既存 `.difficulty-row`/`.formation-label` のスタイルを流用、追加CSSは styles.css に小さく):

```
助っ人  [なし] [紅魔館] [妖怪山] ...   ← 解放済み & 現 home チーム以外。未解放期 (博麗のみ) は row ごと非表示
  └ チーム選択中: メンバー11チップ [咲夜 MF] [美鈴 DF] ...  (data-action="helperPick")
  └ 確定時サマリ: IN 咲夜 (MF/紅魔館) ⇄ OUT [チルノ ▸]   ← OUT ボタンで同 role 候補を循環 (data-action="helperOutCycle")
```

- 追加 data-action は 4 つ: `helperClear` / `helperTeam` (state.helperSrcTeamId 切替) / `helperPick` (progress.helper 確定 + saveProgress) / `helperOutCycle` (outId 循環 + saveProgress)。`bindEvents` の既存 if 連鎖に追記。
- `data-select` home 変更ハンドラに 1 行追加: 新 homeTeamId === helper.teamId なら helper を null 化 (saveProgress)。
- campaign モード時は注記「古巣との対戦では自動的にベンチ / 霊夢たち主要メンバーは外せない」を `.campaign-note` で表示。start-row の選択中テキストに「(+助っ人 咲夜)」を併記して確定感を出す。
- フル編成UIは作らない (rank22 ライト案の通り)。

## (4) VN/因縁/実況との整合リスクと対策 + キャンペーン可否の提案

| 系統 | リスク | 対策 |
|---|---|---|
| STORY_OPENING/PRE/WIN/ENDING | findRosterChar はグローバル検索なのでクラッシュ無し。ベンチの博麗メンバーが喋る = 「試合外の会話」として整合可能。逆方向の「自軍助っ人が敵側として喋る」(咲夜 vs 紅魔館戦) が真の矛盾 | **古巣戦自動ベンチ**で根治 (その試合は本当に紅魔館側に居るので VN が正しくなる)。同一キャラ両軍出場も同時に解消 |
| resultDialogue | 話者ベンチ時に `players[0]` fallback で別人が代表セリフを喋る (唯一のコード的事故) | OUT 候補から `RESULT_DIALOGUES[id].speaker` を除外 (PROTECTED_SPEAKERS、全モード必須) |
| 因縁VN | 実フィールドのペアからのみ発火 → 居ないキャラは喋らない。助っ人で新ペア発火が増えるのはむしろ報酬 (例: 助っ人咲夜 vs 永遠亭で咲夜の因縁が自軍側で見られる) | 無対策で可。`rivalryShown` の 1試合1回ガードもキー仕様 (id sort) のまま動く |
| preMatchDialogue / 実況 / judge / MVP / cutin | away 専用 or 実 actor 参照 or id ベースのアセット参照 (88キャラ分既存) | 無風。MVPカードに `isHelper` バッジだけ任意追加 |

**キャンペーン可否の提案: 「ガードレール付きで許可」を推奨。**
- 理由: rank22 の狙いは「解放→育成→編成」ループの接続で、本命の使い道は周回 (HARD/難易度制覇) のキャンペーン。free 限定だと解放報酬がまたチェックマーク寄りに戻る。
- ガードレール: (i) 古巣戦自動ベンチ (必須)、(ii) RESULT speaker 保護 (必須)、(iii) hakurei は STORY コア5 (reimu/marisa/sanae/youmu/suika) を OUT 不可に (推奨)。(iii) でも OUT 候補は DF4人全員/MF2人/FW2人 残り、編成自由度は十分。保守判断を後で変えられるよう PROTECTED_SPEAKERS のテーブル 1 箇所に集約。
- 代替案 (より安全): Phase1 で free のみ解禁 → 評判を見て campaign 解禁。ただしガード実装差分が小さい (テーブル+resolveHelper の分岐のみ) ため一括実装を推奨。

## (5) テスト観点 (tests/smoke.spec.js + __touhouSpellFutsalDebug 拡張)

debug フック追加: `setHelper(teamId, playerId, outId)` / `activeHelper()` (sanitize 経由で progress に注入)。

1. 編成反映: helper セット→start で home 11人・helper 在籍・out 不在・away 11人不変・GK ちょうど1人 (役割スワップ+redistribute 回帰)。
2. 古巣戦: away=借り元で start → helper 不参加・元の11人・スキップログ文言。
3. 永続化: リロード後 renderSetup に助っ人表示 / `resetProgress` で消えてクラッシュなし (既存 "progress reset keeps the game playable" 拡張)。
4. 検疫: localStorage に壊れ helper (未知ID/未解放チーム/role 不一致 outId) 注入 → null 化されタイトル白画面なし。
5. 途中セーブ→resume: 助っ人がフィールドに残る (players スナップショット)・away 保持 resume の enemyTurn 起動回帰。
6. 話者保護: outId に reimu を強制しても除外され、result dialogue の話者が霊夢のまま。
7. XP: 助っ人の得点で `playerXp[helperId]` が増える / 次試合の statBoost に乗る。
8. 因縁: 助っ人ペアの rivalry が `rivalryFor` で引ける + `vnDataAudit` がパスし続ける (データ無改変の確認)。
9. UI: 初期状態 (博麗のみ解放) で helper row 非表示 / free で表示 / campaign で注記表示。

## (6) 実装ステップ順

1. **スキーマ**: `defaultProgress`/`loadProgress`(+`sanitizeHelper`)/`resetProgress` に helper 追加。`PROTECTED_SPEAKERS` テーブル定義 (RESULT_DIALOGUES から導出 + hakurei コア5)。
2. **ロジック**: `resolveHelper` 新設、`cloneTeam` に第3引数 `opts.opponentId` と members 差し替え、`startMatchCore` の呼び出し変更+参戦/スキップログ。
3. **UI**: `renderSetup` に helper row 3 段、`bindEvents` に 4 アクション + home 変更時の helper 無効化、styles.css に chip スタイル。
4. **整合仕上げ**: 試合中 statbox/MVP カードの「助っ人」バッジ (`isHelper`/`originTeamName`)、campaign 注記文言。
5. **テスト**: debug フック 2 本 → 上記 T1-T9 を smoke.spec.js へ追加、既存全テスト回帰。
6. **文書**: README の今後リスト・ROADMAP_AUDIT rank22 への着手メモ更新。

依存・注意: data.js 切り出しが同時進行中のため、実装着手時に行番号ではなく関数名 (`cloneTeam`/`renderSetup`/`bindEvents`/`loadProgress`) で位置決めすること。data.js 側は原則無改変 (PROTECTED_SPEAKERS をデータ寄りに置く判断をしない限り)。

### Critical Files for Implementation
- C:\Users\stayg\claude_project\touhou_spell_futsal\src\game.js (progress スキーマ / resolveHelper+cloneTeam / renderSetup+bindEvents / resultDialogue / debug フック — 変更の9割)
- C:\Users\stayg\claude_project\touhou_spell_futsal\src\data.js (TEAMS roster・RESULT_DIALOGUES・RIVALRY_DIALOGUES の参照元、原則読み取りのみ)
- C:\Users\stayg\claude_project\touhou_spell_futsal\src\styles.css (helper row / member chip の最小スタイル)
- C:\Users\stayg\claude_project\touhou_spell_futsal\tests\smoke.spec.js (T1-T9 回帰テスト追加)
- C:\Users\stayg\claude_project\touhou_spell_futsal\ROADMAP_AUDIT.md (rank22 仕様確定の記録)