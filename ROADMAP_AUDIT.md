# 東方スペルサッカー 開発ロードマップ統合結果

## 現状総評
骨格は驚くほど完成度が高い。30ターン制/接触コマンドバトル/シュートvsGK3択/3段必殺/霊力消費/カットイン/VS画面/因縁VN32ペア/MVP/XP成長と、キャプ翼系スポーツRPGの構成要素は一通り揃い、VN(v6.1拡充)と演出のジュースも厚く、ビルド無しゼロ依存配布とPlaywright26本のスモークも備える。一方で出荷品質には穴がある。最大の地雷はenemyTurnのsetTimeout/VN待ちポーリングが画面遷移後も生き残り破棄済み/別試合のbattleにresolveBattleを撃つcriticalレースで、連戦・難易度切替・因縁VN挿入で確実に顕在化する。バランス面では究極シュート近距離が勝率90-97%の支配戦略で、通常シュート16%との段差により意思決定が二値化、霊力経済も緩く消費の意味が薄い。ジャンルの核では88体ぶん書いた固有スペルが試合中一切使われず汎用名に潰れている(最大の機会損失)。物語は全編が博麗神社POV固定なのに8チーム自軍選択可で構造矛盾を抱え、混成編成未実装で解放のご褒美感が薄い。プロトタイプとしては上澄みだが、頒布品質に上げるにはレース根治・バランス再設計・固有スペル活用・POV整合・出荷整備の5本柱が要る。

## テーマ
- **出荷整備(クラッシュ根治・データ安全・権利)**: タイマーレース(critical)、保存スキーマ無バージョニング、resetProgress脱落バグ、二次創作権利表記欠落は頒布の直接ブロッカー。更新配布のたびにクラッシュ/データ破損を撒く前に最優先で潰す。
- **ジャンルの手触り強化**: 固有スペル88体の活用・必殺vs必殺の真っ向勝負・消耗ドラマ・実況は低〜中コストで体験が激変する核心。商品としての訴求点(全88キャラ個別技)に直結。
- **バランス調整**: 究極支配戦略の解体と霊力経済の引き締めで意思決定を取り戻す。これが無いと演出を盛っても戦術が単調なまま。
- **テンポ・操作性UX**: 相手ターンの直列待ち(最悪1.4秒+カットイン1.48秒)とコマンド配置/キーマップの不一致は周回体験を直撃。演出スキップとキー統一は低コスト高効果。
- **コンテンツ拡充・周回動機**: POV整合、敗北ルート、無言58キャラへの一言、解放チームの使い道(ライト混成)、周回の到達目標。同人としてのやり込みと商品厚みを底上げ。
- **品質保証・保守性**: CI不在・RNGシード無し・単一3243行ファイル・76MB無圧縮アセット。バランス調整を数値で守り、長期改修と配布最適化を支える土台。

## 優先順位付き作業項目

### #1 タイマー世代照合(matchToken)とcancelPendingTimers集約で遷移後レースを根治  [出荷整備(クラッシュ・データ安全・権利)] (effort:M / sev:critical)
- なぜ今: 破棄済み/別試合のbattleにresolveBattleを撃つcriticalレース。連戦・再戦・難易度切替・因縁VN(50%)挿入で確実に踏む致命傷。プレイ中の最頻クラッシュ源。
- 内容: matchに世代ID(matchToken)を持たせ、enemyTurn/tryResolve/interrupt wait/rivalry-VN onCompleteの全保留コールバックでcapture済みトークンを照合し不一致ならno-op。reset/startMatchで全保留タイマー(vsScreenTimer/actionSceneTimer/judgeTimer/halftimeReportTimer+enemyTurn系)を一括clearするcancelPendingTimers()を実装し画面遷移時に必ず呼ぶ。
- 依存: なし

### #2 状態前提関数への一律null/finishedガード追加  [出荷整備(クラッシュ・データ安全・権利)] (effort:S / sev:high)
- なぜ今: resolveBattle冒頭のstate.battle.defenderId参照、openBattleのcarrier=undefined、clearActionSceneLaterのstate.match.finished参照が遅延発火でTypeError。rank1と同根のクラッシュを面で塞ぐ低コスト措置。
- 内容: resolveBattle先頭にif(!state.match||state.match.finished||!state.battle)return; openBattleにcarrier/defender null早期return、clearActionSceneLater/各タイマーコールバック先頭にstate.screen!=='match'なら returnの共通ガード。team用遅延resolveも同ガード経由。nearestOpponentに空配列フォールバック。
- 依存: なし(rank1と同時着手が効率的)

### #3 進捗スキーマをdefaultProgress()に集約しresetProgress脱落バグ修正  [出荷整備(クラッシュ・データ安全・権利)] (effort:S / sev:high)
- なぜ今: resetProgressがformation/tactic/playerXpを脱落させ、リセット直後のフリー対戦でcloneTeamがplayerXp undefined参照→クラッシュ。loadProgressとの二重定義が根因。
- 内容: defaultProgress()ファクトリにスキーマを一本化しloadProgress/resetProgress両方から呼ぶ。リセット時はaudioMuted/difficultyのみ引き継ぐ。cloneTeamも(state.progress.playerXp||{})で防御。
- 依存: なし

### #4 途中試合セーブにschemaVersion付与+旧版安全破棄、キー名Soccer/Futsal統一  [出荷整備(クラッシュ・データ安全・権利)] (effort:M / sev:high)
- なぜ今: MATCH_SAVE_KEYがスキーマ無バージョニングで丸ごとresumeMatch。TEAMS/match構造を変えた版を配布すると旧途中セーブが古構造のまま復元→画面真っ白。更新配布の地雷。
- 内容: 保存blobにschemaVersion付与、loadMatchで不一致なら破棄、復元時にhome/away.players必須フィールド存在チェック→欠落でclearMatchSave。キー名をtouhouSpellFutsalMatchV1へ統一(移行で旧キー読込後削除)。__touhouSpellSoccer系フックも整理。
- 依存: なし

### #5 試合中スペル技名を固有spellへ差し替え+spellTextをカットイン表示  [ジャンルの手触り強化] (effort:S / sev:high)
- なぜ今: 88体ぶん書いた固有スペル(マスタースパークシュート/禁忌レーヴァテイン等)が試合では汎用名に潰れ完全同一挙動。ジャンルの根幹が死んでいる最大の機会損失。最小実装で体験が激変、商品訴求点(全88キャラ個別技)になる。
- 内容: spell/ultimate tier選択時にactionSpellNameではなくplayer.spellを技名に使用(究極は『・真』付加)。spellTextをカットイン下部のフレーバーに表示。
- 依存: なし

### #6 演出スピード設定+任意キー/タップで即スキップ  [テンポ・操作性UX] (effort:M / sev:high)
- なぜ今: 相手ターンが最短1.38秒+スペル時カットイン1.48秒の直列待ちでテンポを大きく損なう。周回前提の同人作品で体感を最も上げる低コスト改善。
- 内容: progressに演出スピード(標準/高速/瞬間)を追加しVS740/カットイン1480/actionScene2600等を一括スケール。skippableフラグでクリック/任意キーで現在演出を即スキップ。tryResolveのポーリングはrank1のトークン化と合わせ固定遅延を圧縮。
- 依存: rank1(タイマー集約と同じ箇所を触るため後がけ推奨)

### #7 究極シュートatkBonus圧縮+距離補正強化、通常シュートに地力付与  [バランス調整] (effort:M / sev:critical)
- なぜ今: 前進→究極連打の支配戦略を解体しないと、演出を盛っても戦術が二値判断に縮退したまま。通常/スペル/究極を35%/55%/75%帯の明確な期待値カーブに再設計する核心。
- 内容: shoot究極atkBonus 58→38、距離補正をdist-12起点・係数1.1に強化。通常シュートに常時ボーナス(+10〜14)or低コスト高効率の再設計で近距離35%に。連続シュート/ドリブルに被守備逓減を検討。
- 依存: rank20のrng集約+エンジン単体テストがあると安全(無くても着手可、検証は手動)

### #8 霊力経済の引き締め  [バランス調整] (effort:M / sev:high)
- なぜ今: passive+3/ハーフ+25/連携recover+5が緩く、FW予算240で究極5発。霊力管理に失敗しない=消費の意味が薄い。終盤の残量がスコアを決める意思決定を作る。
- 内容: passive +3→+1〜2、ハーフ+25→+15、連携通常recover +5→+3(casterがループで純減)、究極シュートcost 48→52〜56。XP_TABLE.win(80)が未呼出の死に設定なので勝利XP付与も同時に。
- 依存: rank7と一体で調整(同じバランス検証で確認)

### #9 全シナリオ博麗神社POV固定の構造矛盾を解消  [コンテンツ拡充・周回動機] (effort:M / sev:critical)
- なぜ今: 8チーム自軍選択可なのに開幕/前哨/勝利/EDが全て博麗POV。紅魔館を自軍にすると居ないキャラが喋りhakurei用VNが無く素通り。解放チーム周回が破綻体験になる整合性問題。
- 内容: 最小コスト=キャンペーンを博麗神社専用に絞り他チームはフリー対戦限定とUIで選択不可に明示。中コスト=各チーム簡易OP2-3パネル+汎用STORY_PREフォールバックをVNに用意。
- 依存: なし(最小コスト案なら独立)

### #10 報酬spirit/XP boostをcloneTeam段階に一本化  [出荷整備(クラッシュ・データ安全・権利)] (effort:M / sev:high)
- なぜ今: applyClearReward由来のmaxGuts加算がresetPositionsの再cloneで巻き戻り、guts>maxGutsでメーター振り切れ。報酬と位置リセットの責務分離が崩れた二重適用の温床。
- 内容: 報酬bonusをcloneTeamのboostedStats段階でstats.gutsに織り込み(applyClearReward廃止しrewardSpiritBonusをcloneTeamへ渡す)。最低限guts=min(guts,maxGuts)でclamp。
- 依存: rank4(saveMatchスナップショット整理)と関連、resetPositions周辺を併せて見ると効率的

### #11 saveMatch/resumeMatchのformation固定とresetPositions整合  [出荷整備(クラッシュ・データ安全・権利)] (effort:L / sev:high)
- なぜ今: 復元後にformation変更するとresetPositionsのindex対応で選手とスロットが入替(GKがFW位置に飛ぶ)。XP boostの二重補正も。途中再開で破綻。
- 内容: saved.matchにformation/tactic/difficulty/playerXpスナップショットを同梱、resetPositionsはmatchに固定されたformationを引数で使用。initialSlot直接使用へ移行しcloneTeam再呼出を回避。
- 依存: rank4/rank10(保存スキーマと報酬一本化が前提)

### #12 コマンド方向配置・矢印キー・数字キーの一本化  [テンポ・操作性UX] (effort:M / sev:high)
- なぜ今: →=シュート/↑=ドリブルがサッカー直感に反し、数字1-4が試合中とバトル中で意味衝突。押し間違いを誘発し初見の学習コストが高い。
- 内容: →ドリブル/↑シュート/←パス/↓連携にボタン・grid-area・キーマップを一致。数字はフィールド専用、バトルはSpace/S/U等で体系分離。ボタンにキーヒント併記しhelpと完全一致。
- 依存: なし

### #13 必殺シュートvs必殺セーブの多段クラッシュ化  [ジャンルの手触り強化] (effort:L / sev:high)
- なぜ今: baseAtk>=defの一回比較で即決着し、相手の必殺に必殺セーブで対抗するキャプ翼最大の見せ場が無い。ジャンルの核だがeffort大なので固有スペル(rank5)の後に。
- 内容: 威力とセーブ値の差分でクラッシュ段階表示(弾いた→こぼれ球→押し込んだ)。スペルシュートにGK側スペルセーブの第2択。拮抗時(差±10)にせめぎ合いカットイン。
- 依存: rank5(固有技名),rank7(シュートバランス確定後)

### #14 消耗ドラマ+状況実況テキスト生成器  [ジャンルの手触り強化] (effort:M / sev:high)
- なぜ今: 低霊力でも技が出せ事務的ログのまま。終盤の緊張を言葉と数値で盛る。中コストでジャンル感が一段上がる。
- 内容: 霊力低下時に攻撃値へ負補正(guts<25%でshoot/dribble -15%)+『息が上がっている』ログ。残ターン・点差・距離・因縁を引数に取る実況生成器をゴール/同点逆転/ロスタイム/連続突破に差込。
- 依存: rank8(霊力カーブ確定後),rank5

### #15 GK3択を真のジャンケン化+ドリブルspeed係数対称化  [バランス調整] (effort:L / sev:medium)
- なぜ今: GK3択は守備係数違いだけで運/最適固定に縮退、高機動ドリブラー(Aya97%)が壊れている。接触全体を数値の大小から読み合いへ。effort大なので後段。
- 内容: GK3択をコース選択(左/中/右)vs読みの相性表(当て1.4倍/外し0.7倍)に。rushはハイリスク技として再設計。ドリブルspeed係数を攻守0.30/0.30に揃え、被ブロックで前進量半減を追加。
- 依存: rank7/rank8(バランス基盤確定後)

### #16 敗北ルートのケア(再挑戦導線+敗北専用VN)  [コンテンツ拡充・周回動機] (effort:M / sev:medium)
- なぜ今: campaignで1敗=実質ゲームオーバーでsetupに戻るだけ。敗北の物語的意味が空白で悔しさが次周回に変換されない。
- 内容: 敗北時にcampaign文脈で『同じ相手に再挑戦』ボタンを進行保持で表示。各チームに敗北専用1-2パネルVN。campaignClears多重加算防止フラグ(retry連打でclears無制限増加バグ)も同時修正。
- 依存: rank9(POV整合)と物語整合を合わせると効率的

### #17 無言58キャラへ一言+各チーム残メンバーへ簡易因縁ペア  [コンテンツ拡充・周回動機] (effort:M / sev:medium)
- なぜ今: 看板の88キャラ中喋るのは実質30名。残58名が無言の頭数。低コストで密度最大、全キャラ個別セリフは商品説明の訴求点。
- 内容: 全員に試合前ベンチコメントor接触テロップ(spellText流用可)を付与。各チーム残6-8名へ短い因縁/自己紹介ペアを各1個。同チーム内ペアは前哨VN側に回し因縁VN取りこぼしも整理。
- 依存: なし

### #18 PNGアセット圧縮+ギャラリーlazy load+配布ホワイトリスト  [品質保証・保守性] (effort:M / sev:medium)
- なぜ今: 76MB無圧縮+ギャラリー184枚一括ロードでZIP肥大・モバイル初期表示重い。頒布最適化として効果大。
- 内容: PNG→WebP/pngquantで76MB→15-25MB(視覚劣化ほぼ無)。ギャラリーimgにloading=lazy/decoding=async。package_release.ps1を同梱ホワイトリスト化し生screenshot混入を排除。
- 依存: なし

### #19 二次創作権利表記とライセンス整備  [出荷整備(クラッシュ・データ安全・権利)] (effort:S / sev:high)
- なぜ今: 東方Project二次創作でAI生成CG同梱なのにガイドライン準拠表記・原作クレジット・AIアセット注記が無く、頒布時の権利リスク。EDの『開発: Claude × Stayg』本編露出も整理対象。
- 内容: README/配布ZIPに東方二次創作ガイドライン準拠宣言・上海アリス幻樂団/ZUN氏クレジット・AI生成注記。コードとアセットのライセンス分離。ED開発クレジットをスタッフロール末尾に分離。サッカー/フットサル/ソッカー表記をスペルサッカーへ統一。
- 依存: なし

### #20 CI構築+Math.randomシード化+エンジン単体テスト  [品質保証・保守性] (effort:L / sev:medium)
- なぜ今: CI不在で回帰検知が属人化、RNGシード無しでバランス調整を数値で守れない。rank7/8/15のバランス再設計を安全に進める土台。
- 内容: playwright.config.jsでwebServer自動起動+chromium化(Edge依存排除)、GitHub Actionsでpush/PRごとnpm test。Math.randomをrng()に集約しシード固定、resolveBattle/redistributeForFormation/AIスコアリングをNode単体テスト化。バランス指標スナップショット。
- 依存: なし(rank7着手前に整うと理想)

### #21 data.js切り出しによるgame.js分割  [品質保証・保守性] (effort:L / sev:low)
- なぜ今: 単一3243行でデータ・エンジン・AI・VN・描画が密結合し保守スケールしない。file://直開き互換を維持したまま負債を軽減。
- 内容: TEAMS/FORMATIONS/TACTICS/全DIALOGUESをdata.js(script追加読込、ESM不要)へ切出しgame.jsを約1000行減。次段でaudio.js/vn.js分割。バンドラ導入は配布チャネル確定後。
- 依存: なし(コンテンツ拡充が一段落してから)

### #22 解放チームのライト混成(助っ人1枠)+EDやり込み報酬  [コンテンツ拡充・周回動機] (effort:L / sev:medium)
- なぜ今: 解放→育成→編成の王道ループが断絶し解放がチェックマーク止まり。READMEの混成編成候補をライト実装で費用対効果良く実現。EDも到達目標として強化。
- 内容: スカウト1枠『助っ人』で他チームから1名借りるライト混成(フル編成UIより安価)。ED冒頭に累計MVP/最多得点を動的差込、HARD/全難易度制覇で隠しパネル(真EDテロップ)。2周目対戦順シャッフルや裏トーナメント。
- 依存: rank9(POV整合),rank16(敗北ケア)が前提だと体験が締まる

## 推奨 next sprint
- matchTokenによる全保留タイマー世代照合とcancelPendingTimers()集約でcriticalレースを根治(rank1)
- resolveBattle/openBattle/clearActionSceneLater等へnull/finishedガードを一律追加(rank2)
- defaultProgress()集約でresetProgressのformation/tactic/playerXp脱落バグを修正(rank3)
- 試合中スペル技名を固有player.spellへ差し替え、spellTextをカットインに表示(rank5)
- 演出スピード設定(標準/高速/瞬間)+任意キー/タップでの即スキップ実装(rank6)
- 二次創作権利表記・原作クレジット・サッカー表記統一(rank19)

## quick wins
- 試合中スペル技名を固有spellへ差し替え(rank5・effort S)で88体の設定資産を即活性化、体験が劇的に変わる
- 状態前提関数へのnull/finishedガード一括追加(rank2・effort S)でクラッシュを面で削減
- resetProgress脱落バグをdefaultProgress()集約で修正(rank3・effort S)
- 通常シュートへの地力付与でtier3択を機能させる(rank7の一部・effort S)
- 二次創作権利表記+サッカー/フットサル/ソッカー表記統一(rank19・effort S)
- XP_TABLE.win(80)が未呼出の死に設定→勝利時にgainXp(p,'win')を付与(rank8の一部・effort S)

## risks
- critical: enemyTurnのtryResolveタイマーが画面遷移(reset/再戦)後も生き残り、破棄済み/別試合のstate.battleにresolveBattleを撃つ。matchの同一性を見ておらず、連戦・難易度切替・因縁VN挿入で確実に踏む
- critical: 因縁VN表示中の試合終了/遷移でonComplete(openBattle)が古い/別matchを触り、carrier=undefinedでnearestOpponent例外
- critical(バランス): 究極シュート近距離が勝率90-97%の支配戦略で前進→究極連打が全試合の最適解、tier選択が二値化
- critical(物語): 全シナリオ博麗神社POV固定なのに8チーム自軍選択可。解放チーム周回でVN素通り/居ないキャラ発話の破綻
- high: resolveBattleがstate.battle null時に例外。760msの遅延発火中にEsc/操作でbattle消滅でTypeError
- high: MATCH_SAVE_KEYがスキーマ無バージョニングで丸ごとresume、構造変更版配布で旧途中セーブ復元→画面真っ白
- high: resetProgressがplayerXp等を脱落させリセット直後フリー対戦でcloneTeamがクラッシュ
- high(物語): campaign敗北で1敗=実質ゲームオーバー、敗北ルート不在
- high(権利): 東方二次創作+AI生成CG同梱なのにガイドライン準拠表記・クレジット欠落で頒布リスク
- high: 報酬spirit/XP boostがresetPositionsの再cloneで巻き戻りguts>maxGutsでメーター振り切れ(二重適用)
- medium: campaignClearsが最終戦retry連打で無制限加算(多重加算防止フラグ無し)

## open questions
- 配布チャネルは何を想定しますか?(無償公開/同人即売会/FANZA等)。権利表記要件・アセット圧縮の優先度・将来のElectron化判断が変わります
- 物語POV矛盾の解消方針はどちらにしますか?(A:キャンペーンを博麗神社専用に絞り他チームはフリー対戦限定=低コスト整合、B:各チーム簡易OP+フォールバックVN=中コストで解放チーム周回を活かす)
- タイトル/競技名は『スペルサッカー』に統一でよいですか?(内部キーは互換のため据え置き可。フットサル/ソッカー表記をどう寄せるか)
- バランス再設計(究極圧縮・霊力引き締め)は今スプリントで着手しますか?それともCI+RNGシード化(rank20)で数値検証の土台を先に整えてから着手しますか?
- 『88キャラ全員に個別セリフ』を商品訴求点として優先するか、戦闘の手触り(必殺vs必殺・実況)を優先するか、どちらをコンテンツ拡充の主軸にしますか?
- 混成チーム編成(rank22)はライト版(助っ人1枠)で良いですか?それともフル11枠自由編成まで踏み込みますか?(後者はXL)
