# スプライトアニメ+CG+SE 制作計画

## 演出原則
- 原則1(最優先・engine は spell 分のみ実装済): 真のディレイ式スプライト2-3枚パラパラ。枚数でなくタイミングが命=可変4コマは均一12コマに勝つ。必殺カットインは既に frameA(タメ)→frameB(放出)の2枚めくり実装済だが、汎用アクション(pass/shoot/dribble)はまだ静止ポートレートを CSS で滑らせるだけ=ここに2フレーム差し替えを移植する
- 原則2(現状ゼロ・要新規): ヒットストップ。インパクトの瞬間に3-5フレーム(50-83ms通常/200ms必殺)全アニメを止めると体感強度が跳ね上がる。画面揺れの最中に0.1s静止を挟むと体感+約30%。impactMs() で fast/instant でも下限120msを死守し当たりを潰さない
- 原則3(spell分は実装済・通常分が未): SEは『タメ音→インパクト音』の2段。低周波タメが高まって高周波インパクトで割れる。必殺=spell-charge/impact・ultimate-charge/impact は完成。通常 kick/pass/shoot に2段が無い=ここを追加。必殺と通常は音色(通常 square/saw、必殺 noise層+低音うねり)で差別化
- 原則4(部分実装): スピード線・集中線・インパクトフレーム。走るキャラ背後の水平流線が無い。集中線(judge-burst)が今ゴール限定で発射/突破/セーブに未流用。必殺専用の強インパクトフレーム(画面全体をテーマ色で一瞬抜く漫画の『間』)が無い。色は judge-flash の kind 別色マップに揃える
- 原則5(READMEの宿題・フラグのみ実装): 必殺シュート vs 必殺セーブの多段クラッシュ。finalizeShoot に clash フラグ(line 1903)とテキスト分岐は既存だが視覚演出が伴っていない=半完成。両者カットイン→中央衝突→hitstop200ms→拮抗ゲージ→決着の鍔迫り合いを完成させる『目玉』
- テンポ設計(animMs 機構に統合済): per-コマ標準=構え300-500ms / タメ80-160ms / 放出50ms / インパクト保持 必殺200ms・通常120-150ms / 回復120ms / 走行コマ83-100ms(速めでキレ)。ヒットストップ=通常66ms・必殺/ゴール200ms。全タイマーは animMs()/impactMs() を通し animSpeed(normal/fast/instant)と整合させる
- 実装ガード(既存資産活用): 全新規 setTimeout は matchAlive(token) ガード必須、cancelPendingTimers に hitstopTimer/spriteFrameTimer を登録。新規エンジン不要 — state.actionScene/state.cutin の拡張と CSS 追加・audio.play レシピ追加のみ。88体 portrait/cutin が既存、frameB は34/88で生成パイプ(generate_spell_frames.py)も稼働中

## 汎用アクションシーン棚卸

### [shoot] シュート(踏み込み→振り抜き)  (frames:2, 768x448(songmix_v13 安定域。横長 cinematic でボール飛翔の余白を取る))
- 命名: assets/anim/shoot_1.png(踏み込みテイクバック・ボール足元・体重移動) / shoot_2.png(インパクト直後・蹴り脚振り抜き・ボール超高速で離れる)
- フック: resolveBattle shoot分岐 line 1795-1834。setActionScene('shoot' line 1920/1933/1957) と finalizeShoot のスプライト差し替え
- SE: 通常: shoot-charge(saw 220→440 ポルタメント 120ms タメ)→100ms後 shoot-impact(noise0.05+矩形160Hz)。必殺: 既存 showCutin の spell/ultimate-charge→impact が掛かるので汎用SEは鳴らさない
- プロンプト:
    f0: soccer player taking position for powerful shot, planting foot, ball at feet, weight shifting back, anime game art, cel shading, dynamic explosive pose, single athlete, no text, polished doujin game art, masterpiece, best quality
    f1: soccer player just kicked powerful shot, leg follow-through swing, ball rocketing away with motion blur, anime game art, cel shading, dynamic explosive pose, radial speed lines, single athlete, no text, polished doujin game art, masterpiece, best quality

### [pass] パス(構え→蹴り出し)  (frames:2, 768x448)
- 命名: assets/anim/pass_1.png(足元ボール・テイクバック・踏み込み重心) / pass_2.png(インパクト直後・足の振り抜き・ボール飛行開始)
- フック: resolveBattle pass分岐 line 1761-1793。setActionScene('pass' line 1780/1789)
- SE: 通常: pass-charge(軽い select 系 660 triangle)→pass-impact(既存 pass-success 660→990 をトラップ確定で)。インターセプト失敗=intercept(既存 140saw+noise)+軽 fieldShake
- プロンプト:
    f0: soccer player preparing to pass ball, ball at feet, takeback, planting stance, anime game art, cel shading, dynamic flowing pose, single athlete, no text, polished doujin game art, masterpiece, best quality
    f1: soccer player passing ball, foot follow-through, ball leaving toward teammate with light motion, anime game art, cel shading, dynamic flowing pose, single athlete, no text, polished doujin game art, masterpiece, best quality

### [dribble] ドリブル(タッチ→突破)  (frames:2, 768x448)
- 命名: assets/anim/dribble_1.png(軽いタッチ・ボール足元・体傾き) / dribble_2.png(高速突破・足上げ・ボール少し浮き・残像 smear)
- フック: resolveBattle dribble分岐 line 1730-1758(突破成功 line 1740-1747)
- SE: 通常突破: dribble-break(既存 520→780)。ヒットストップ無し(スピード感優先)。ultimate突破のみ抜き際スピード線強160ms
- プロンプト:
    f0: soccer player dribbling ball with light touch, ball at feet, body leaning into run, anime game art, cel shading, speed motion blur, single athlete, no text, polished doujin game art, masterpiece, best quality
    f1: soccer player bursting past defender at high speed, ball pushed forward, afterimage smear, strong horizontal speed lines, anime game art, cel shading, single athlete, no text, polished doujin game art, masterpiece, best quality

### [tackle] タックル(突入→接触)  (frames:2, 768x448)
- 命名: assets/anim/tackle_1.png(低い重心の突入・前足リード) / tackle_2.png(接触時・ボール奪取・相手との接触表現)
- フック: resolveBattle dribble失敗(被タックル) line 1748-1758 / handleInterrupt tackle分岐
- SE: 接触点で tackle(既存 noise+180Hz saw)。ヒットストップ66ms→fieldShake中振幅→knockbackBall(既存 line 1754)で ball ballSteal
- プロンプト:
    f0: soccer defender lunging into tackle, low center of gravity, leading leg extended, anime game art, cel shading, dynamic contact pose, single athlete, no text, polished doujin game art, masterpiece, best quality
    f1: soccer defender at moment of tackle contact, winning the ball, ball knocked loose, impact burst, anime game art, cel shading, dynamic contact pose, single athlete, no text, polished doujin game art, masterpiece, best quality

### [intercept] インターセプト(読み→カット)  (frames:2, 768x448)
- 命名: assets/anim/intercept_1.png(読みの体勢・前足リード・視線前方) / intercept_2.png(パスカット直前・反応・足を伸ばしボールに触れる)
- フック: resolveBattle pass失敗(カット) line 1783-1792 / handleInterrupt intercept分岐
- SE: intercept(既存 140saw+noise)。守備者が割り込む1枚を中央挿入、軽 fieldShake
- プロンプト:
    f0: soccer defender reading the pass, anticipation stance, leading foot forward, eyes ahead, anime game art, cel shading, quick reaction pose, single athlete focus, no text, polished doujin game art, masterpiece, best quality
    f1: soccer defender intercepting pass, leg extended to cut the ball, sharp reaction burst, anime game art, cel shading, quick reaction pose, single athlete focus, no text, polished doujin game art, masterpiece, best quality

### [gk_save] GKセーブ(構え→ダイブ)  (frames:2, 768x448)
- 命名: assets/anim/gk_save_1.png(GK準備・両足着地・構え) / gk_save_2.png(セーブ直後・飛びつき・反射的キャッチ or パンチング)
- フック: finalizeShoot 完全セーブ line 1944-1959 / こぼれ球 line 1925-1943
- SE: catch=save(既存 784→1175 高域クリア)+ヒットストップ66ms / punch=save+こぼれ球 ヒットストップ無し / rush=飛び出し。spellSave は既存 showCutin (line 1956) でカバー
- プロンプト:
    f0: soccer goalkeeper ready stance, knees bent, arms wide, eyes on ball, anime game art, cel shading, reflexive pose, single athlete, no text, polished doujin game art, masterpiece, best quality
    f1: soccer goalkeeper diving save, full stretch, hands reaching the ball, dynamic dive, anime game art, cel shading, reflexive save pose, single athlete, no text, polished doujin game art, masterpiece, best quality

### [goal] ゴール歓喜(決定→喜び)  (frames:3, 768x448)
- 命名: assets/anim/goal_1.png(シュート直前・決定力ポーズ) / goal_2.png(インパクト・ボールがゴールへ) / goal_3.png(両腕上げの歓喜)
- フック: finalizeShoot ゴール分岐 line 1905-1924 / showJudge('goal') line 2337-2344(fieldShake 既存)
- SE: goal(既存 523-1046 アルペジオ)→whistle(2200)→ovation(noise0.4+和音)を 200ms差で順に重ね。必殺ゴールのみ ovation gain 1.4倍。hitstop 200ms(揺れ内0.1s静止1回)
- プロンプト:
    f0: soccer striker at the decisive shooting moment, determined pose, ball at feet, anime game art, cel shading, dynamic pose, single athlete, no text, polished doujin game art, masterpiece, best quality
    f1: soccer striker striking the ball into goal, ball flying into net, impact burst, anime game art, cel shading, explosive pose, single athlete, no text, polished doujin game art, masterpiece, best quality
    f2: soccer player celebrating goal, both arms raised, joyful victory expression, anime game art, cel shading, triumphant pose, single athlete, no text, polished doujin game art, masterpiece, best quality (celebration/victory/joy 強調で「無反応ポーズ」破綻回避、破綻時 seed±5 で再生成)

### [kickoff] キックオフ(蹴り出し)  (frames:1, 768x448(1枚なのでアニメ無し・開始演出の静止見せ場))
- 命名: assets/anim/kickoff_1.png(キックオフ・ボール蹴り出し・開始ポーズ)
- フック: startMatchCore kickoff actionScene line 1299-1308 / kickoff() line付近
- SE: 既存 kick(noise0.06)。演出は最小、試合再開の合図
- プロンプト:
    f0: soccer player kicking off at center circle, foot on ball, starting pose, anime game art, cel shading, dynamic starting pose, single athlete, no text, polished doujin game art, masterpiece, best quality

## 必殺技フレーム(spellFrames)
- approach: 必殺技 frameB(放出/インパクト瞬間)は既存 scripts/generate_spell_frames.py がそのまま稼働中。frameA={id}.png をタメ/詠唱、frameB={id}_b.png を climax/burst とし、showCutin が animMs(180) でめくる。現状 34/88 完了、残54体。新規スクリプト不要 — 既存を残キャラに流すだけ。frameB プロンプトは frameA(CUTIN_OVERRIDES)に climax suffix を機械付加する方式が既に workflow_b に実装済(generate_spell_frames.py line 29-37)。
- frameBPrompt: {frameA_prompt}, climactic release frame of the special move, spell energy fully unleashed, blinding burst of light, explosive impact, strong radial motion blur, dynamic follow-through pose, dramatic anime game special move cut-in, wide cinematic composition, radial speed lines, intense rim lighting, futsal arena background, no text, clean cel shading, polished doujin game art, masterpiece, best quality  ※これは workflow_b 既存実装そのまま。NEGATIVE は generate_spell_cutins.NEGATIVE を継承
- seedStrategy: seed = 360528000 + index(frameA の 260528000+index と別系列にして同一キャラで別ポーズを引く)。既存実装済。別キャラ顔混入は系列分離で <0.5%。破綻キャラのみ --force + --chars で seed offset を手調整(±5)
- naming: assets/cutins/{id}_b.png、manifest=assets/cutins/frames_manifest.json(char_id→相対パス)。SaveImage filename_prefix=touhou_spell_futsal/cutin_frames/{id}_b
- count: 54
- estimate: 残54体 × ~3.5秒(steps=26,cfg=4.5) = ~190秒(GPU実時間)+I/O。メモリ安定化のため --chars で27体ずつ2分割推奨。完了で 88/88、所要トータル 5-7分

## SE cues
- **shoot-charge** (通常シュート発射の踏み込み(resolveBattle shoot line 1807, isSpell=false 時。spell時は spell-charge が掛かるので鳴らさない)): this.tone(220,0.12,'sawtooth',0.022); this.tone(440,0.12,'sawtooth',0.018,0.04) — saw 220→440 のポルタメント上昇120msでタメ感。gain 通常帯 0.022
- **shoot-impact** (放出フレーム(shoot_2)切替と同時、charge から約100ms後。通常シュートのボール射出): this.noise(0.05,0.028); this.tone(160,0.08,'square',0.026,0.005) — noise0.05+矩形160Hzで鋭い着弾。高域の抜けは spell と差別化のため抑えめ
- **pass-charge** (通常パスの蹴り出し前(resolveBattle pass line 1777, isSpell=false)): this.tone(523,0.04,'triangle',0.02) — 軽い triangle 523Hz、短く。中域 親密帯
- **pass-impact** (受け手トラップ確定(既存 pass-success を2段目として流用 or 統合)): this.tone(660,0.05,'triangle',0.022); this.tone(990,0.07,'triangle',0.02,0.05) — 既存 pass-success と同形。トラップ止めの確定音
- **hitstop-cue** (ヒットストップ突入の瞬間(finalizeShoot ゴール/被タックル/被カット直前)。任意・体感補強用): this.tone(80,0.04,'square',0.03) — 80Hz 矩形を一瞬。低周波で「ドン」と止まる感。インパクト保持の心理的アンカー
- **clash-spark** (必殺シュート vs 必殺セーブのクラッシュ(finalizeShoot clash=true line 1903)。拮抗ゲージ詰め中に2連): this.tone(80,0.12,'square',0.03); this.noise(0.12,0.026); 100ms差でもう1発 — 低周波80Hz矩形のうなり+金属的ノイズ0.12sを2連=火花2発。spell-impact より重く
- **goal-stamp** (showJudge('goal') 発火時(line 2337)。GOAL スタンプの鮮烈な合図): this.tone(1300,0.05,'square',0.045); this.tone(1300,0.05,'square',0.045,0.1) — 1300Hz square 50ms×2発、100ms間隔。既存 goal アルペジオとは別レイヤー
- **crowd-rumble** (必殺ゴール確定時、ovation に重ねる「どよめき」(finalizeShoot ゴール かつ useSpell)): this.noise(0.5,0.01); this.tone(60,0.4,'sine',0.012,0.05) — 低周波 noise0.5s+60Hz sine で群衆のどよめき。ovation gain1.4倍と併用

## ゲームエンジン設計
## 現状認識(研究スナップショットより engine は先行している)

実装済を game.js 精読で確認:
- **state.cutin.frames / frameIndex / cutinFrameTimer は既に存在**(state定義 line 194, cancelPendingTimers line 1195/1203 で破棄)。
- **showCutin (line 2451) は既にディレイ式フレームめくり実装済**: player有かつ AVAILABLE_CUTINS なら frames=[cutinFramePath(0)={id}.png, cutinFramePath(1)={id}_b.png]、animMs(180) で flip、frameIndex===1 到達で audio.play(spell-impact/ultimate-impact)。cutinFramePath (line 1390) が frame>=1 で `_b.png` を返す。renderCutin (line 1419) は frames[frameIndex] を出し、_b 欠落時 onerror で fallback、frameIndex>=1 で .cutin-impact クラス付与。
- **charge→impact 2段 SE 実装済**(audio line 444-462): spell-charge(196/262/330/392 saw 上昇+523), spell-impact(noise0.14+90Hz saw+660+990), ultimate-charge(110-392 saw), ultimate-impact(noise0.22+70Hz+523-1046)。研究の原則3はスペル分は概ね完成。

## まだ欠けていて実装すべきもの(優先順)

**(1) impactMs() ヘルパー追加** — animMs (line 1177) の隣に。`function impactMs(ms){return Math.max(120, Math.round(ms*animScale()));}`。インパクト保持/ヒットストップ専用で下限を120msに引き上げ、fast/instant でも当たりが潰れない。

**(2) ヒットストップ (原則2, 現状ゼロ)** — state に hitstop:false / hitstopTimer:null を追加し cancelPendingTimers に登録。新関数 `hitstop(ms, then)`: `state.hitstop=true; render(); state.hitstopTimer=setTimeout(()=>{state.hitstop=false; then&&then();}, impactMs(ms));`。CSS .field.hitstop で全 sprite に `animation-play-state:paused`。差し込み箇所=決着系の showJudge 発火直前: finalizeShoot ゴール分岐(line 1905-1924, ゴール=200ms)、完全セーブ(line 1944, 66ms)、dribble被タックル(line 1748-1758, 66ms)、pass被カット(line 1783-1792, 66ms)。順序は「結果反映→hitstop→showJudge→fieldShake」。

**(3) 汎用アクションスプライトの2フレーム化 (原則1の汎用版)** — renderActionScene (line 1447) は今 renderPortrait の静止画を attackerRush(880ms) で滑らせるだけ。state.actionScene に spriteFrame:0 を追加し、setActionScene 後に setTimeout(animMs(80)) で 1 に進める。renderActionScene の .sprite-runner.attacker に `data-frame="${scene.spriteFrame}"` を付与し、CSS で AVAILABLE_ANIM があれば `.sprite-runner.attacker[data-frame="1"]::after { background-image: url(assets/anim/{type}_2.png) }` を重ねるか、キャラ portrait の上に汎用キックスプライトを薄く重ねる方式。image-rendering:pixelated でドット感維持。spriteFrameTimer を cancelPendingTimers に追加必須。

**(4) スピード線 / インパクトフレーム (原則4)** — CSS のみで足せる: .sprite-runner.attacker[data-frame="1"]::before に repeating-linear-gradient 横縞を animMs(60) で。必殺インパクトフレームは hitstop 中に .impact-frame(z-index最前面, キャラのテーマ色ベタ, animMs(50))。集中線(既存 concentrateLines, judge-burst line 2372 は今ゴール限定)を judge kind=break/through/save にも展開、色は judge-flash の kind 別色マップに揃える。

**(5) クラッシュ演出完成 (原則5, READMEの宿題)** — finalizeShoot に clash フラグ(line 1903)とテキスト分岐は既存だが視覚なし。clash=true 時の専用シーケンス: 攻撃側 showCutin(既存 line 1809 で発火済)→GK側も showCutin(spellSave時 line 1956 を clash時は常時に)→中央 spell-burst+火花→hitstop(200ms)→拮抗ゲージ(margin を 0-100% の DOM バーで animMs(500) 詰め)→決着分岐(押し勝ち=白フラッシュ強+judge goal / 拮抗=火花連発 / 押し負け=ball ballSteal)。SE は spell-impact を2連。

## 整合性ルール(必ず守る)
全新規タイマーは animMs()/impactMs() を通す。全 setTimeout 内は matchAlive(token) ガード(line 1182)。cancelPendingTimers に hitstopTimer / spriteFrameTimer を追加。既存 cutin の frame-flip 機構(showCutin)はそのまま流用し、汎用アクションは別系統(actionScene.spriteFrame)で並走させる。

## バッチ計画
## 検証→全量の2段。frameB 生成は既存 scripts/generate_spell_frames.py がそのまま使える(34/88 完了、残54体)。

**Phase 0 (前提確認, GPU不要)**: ComfyUI 127.0.0.1:8188 起動確認 (request_json('/system_stats'))。残 frameB 54体リスト確定済 (missing: eirin reisen tei mokou junko ringo clownpiece ringo2 seiran iku satori koishi orin utsuho yuugi parsee yamame kisume kuroni kasha jigoku byakuren shou nazrin ichirin murasa unzan mamizou myouon kyouko nue disciple miko futo tojiko seiga yoshika sogashadow mononobe guardian futatsuiwa tsukuyomi byoudou shinmyoumaru seija kagerou yachie mayumi oniko bakeneko kageyachie baketanuki oniwaka hangyakushi)。

**Phase 1 (検証バッチ, 5体)**: `python scripts/generate_spell_frames.py --chars satori koishi utsuho byakuren miko`。狙いは(a)残ってる代表キャラで frameB が frameA とめくって「放った」感が出るか、(b)別キャラ顔混入率の確認、(c)seed 360528000+index 系列の妥当性。所要 ~20秒。生成後 contact_sheet で目視、破綻あれば --force + seed offset 調整。

**Phase 2 (frameB 全量, 残54体)**: `python scripts/generate_spell_frames.py` (skip existing で完了済34体は飛ばす)。メモリ安定化のため `--limit 27` を2回 (--chars 分割) でも可。所要 ~3-4分(GPU実時間)+I/O。完了で 88/88。

**Phase 3 (汎用アクションスプライト検証, 1シーン)**: 新規 generate_action_sprites.py で shoot のみ2フレーム生成 (768x448, songmix_v13)。「キャラ非依存シルエット」が成立するか、man数混在しないか確認。OKなら Phase 5 へ。

**Phase 4 (汎用全量)**: 残7シーン × 2-3frame = 13枚生成。所要 ~1分。

**Phase 5 (manifest sync + 起動確認)**: frames_manifest.json は既に scripts が更新。anim 用に anim_manifest.json 追記。npx http-server で起動し、各 tier の演出を目視。

frameB はキャラ依存だが全量必須(各キャラの見せ場)。汎用アクションは非依存で全試合 reuse なので少数で済む。先に frameB を全量、汎用は後追いで段階投入が安全。

## 実装順序
- 1. impactMs() 追加 + hitstop 機構(state.hitstop/hitstopTimer, hitstop()関数, cancelPendingTimers登録, .field.hitstop CSS)— コードのみ・画像不要・最小コスト最大効果。先にこれを入れると全モードで手応えが安定(原則2)
- 2. 通常アクション SE 2段化(audio.play に shoot-charge/shoot-impact/pass-charge/pass-impact/goal-stamp/clash-spark/crowd-rumble を追記)+ resolveBattle/finalizeShoot の各分岐で発火(原則3)— コードのみ・即着手可
- 3. ヒットストップを決着系に差し込み(finalizeShoot ゴール200ms/完全セーブ66ms, dribble被タックル66ms, pass被カット66ms)+ goal-stamp/crowd-rumble シンク(原則2)
- 4. クラッシュ演出完成(finalizeShoot clash時の専用シーケンス: 両カットイン→中央火花→hitstop200ms→拮抗ゲージ DOM→決着分岐, clash-spark 2連)— READMEの目玉、コードのみ・画像不要(原則5)
- 5. スピード線/集中線/インパクトフレーム CSS(.sprite-runner.attacker[data-frame=1]::before 横縞, judge-burst を break/through/save へ kind 拡張, .impact-frame テーマ色)— コードのみ(原則4)
- 6. frameB 検証生成(generate_spell_frames.py --chars 5体)→ 目視 → 全量(残54体)。88/88 完成
- 7. 汎用アクションスプライト: 新規 generate_action_sprites.py 作成 → shoot 検証1シーン → 残7シーン全量(assets/anim/)→ anim_manifest sync
- 8. 汎用アクション2フレーム差し替えを engine 統合(state.actionScene.spriteFrame, renderActionScene の data-frame, spriteFrameTimer)+ AVAILABLE_ANIM set(原則1汎用版)— 画像が揃ってから最後
- 9. 起動テスト(npx http-server)で normal/fast/instant 各モード×全 tier の演出を目視、matchAlive ガードと halftime/画面遷移の中断耐性を確認

## 要確認(openChoices)
- 汎用アクションスプライト(pass/shoot/dribble等)はキャラ非依存の『汎用シルエット1体絵』でよいか? それとも portrait の上に薄く重ねる演出にとどめ、フル差し替えはしないか。前者は assets/anim 15枚で全試合 reuse でき低コスト、後者はキャラ同一性を保てるが2フレーム化の効果が弱い。推奨=汎用シルエットを portrait と重ねる折衷(image-rendering:pixelated)
- 汎用アクションは何シーン作るか? フル8シーン(pass/dribble/shoot/tackle/intercept/gk_save/goal/kickoff=計15枚)か、効果の高い4シーン(shoot/dribble/gk_save/goal)に絞るか。推奨=まず効果の大きい shoot/goal/gk_save の3シーン検証→良ければ全8
- クラッシュ拮抗ゲージは DOM バー(CSS width アニメ)で表現でよいか、それとも専用 CG/スプライトを生成するか。推奨=DOM バー(画像生成不要・animMs(500)で詰める・即実装)
- 必殺ゴール時の歓声 gain 1.4倍 / どよめき低周波の追加は『うるさい』判定にならないか。BGM 0.012-0.018 帯との被りを試聴で確認したい(audioMuted デフォルト状態も含め)
- 残 frameB 54体の生成は今回まとめて全量回すか、検証5体→OK確認→残49体の段階か。GPU 占有時間(他作業=橘漫画パイプラインとの競合)次第。推奨=深夜/空き時間に --chars 分割で全量
- cutin spell の表示 1480ms(showCutin line 2488)を研究提案どおり 1200ms に詰めてテンポUPするか、現状維持か。frame-flip(animMs180×N)との兼ね合いで体感確認が要る
