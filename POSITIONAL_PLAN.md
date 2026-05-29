# 盤面操作 統合実装プラン

## controlScheme
保持者移動は WASD(+左手) を新規「盤面ドリブル移動」専用に割り当て、既存の矢印キー(↑↓←→)と数字 1-4 はコマンド発火のまま温存する。理由は明確で、smoke.spec.js の「keyboard arrow keys trigger commands」テスト(L251-256)が ArrowUp → .battle-card 表示を assert しており、ArrowUp を移動に転用すると即破綻するため。W=攻撃方向へ1歩前進、A/D=斜め前進(y を±に寄せる)、S=後退(任意/Stage後回し可)。マウスは Stage1 では使わない(field の % 変換ハンドラを render 全置換のたびに貼り直す負荷と、1歩離散との相性の悪さを回避)。ボタン UI は既存クロス4ボタンを1つも消さず、その上に「↑ 前進(W)」大ボタンを1個追加するレイアウトにし、command-title「どうする？」と4ボタン(↑ドリブル/←パス/→シュート/↓連携)を完全に残す(L114-123 テスト保護)。結論: WASD=盤面移動(新)、矢印/数字=既存コマンド(不変)の二層併存。Lens1案①(WASD専用移動)を採用し、Lens2のArrowUp転用案・Lens3のdribbleMoveフラグ二役化は keyboard テスト破壊リスクのため却下。

## tickModel
1歩=1tick かつ「歩は match.turn を消費しない」が結論。stepCarrier(yBias) を新設し、内部で carrier.x/y を小刻みに更新(W=advanceCarrier 相当の前進量を STEP=6〜8 に縮小、A/D=y±10 バイアス)。重要: turn は endTurn() でしか +1 されない(L2176)ので、stepCarrier は endTurn() を呼ばず render() を直接呼ぶ。これで「↑連打で歩ける/送りクリック0/30ターン制(maxTurns=30, L1377)とハーフタイム(turn===16, L2179)が崩れない」を同時に満たす。他選手移動: 既存 moveAiPlayers()(L2445)を1歩ごとに1回呼ぶ(ボール追従が1tick進む既存挙動をそのまま流用、新規ロジック不要)。移動はゲートしない(gate() を挟まない)= state.advance を立てないので、メッセージ送り待ちロジック(L3610)と一切競合しない。結果(接触バトル/シュート/パス/連携)が出たときだけ既存 endTurn()→gate() が turn+1 とゲートを担う。Lens2/Lens3 が一致してこの分離を支持しており、move カウンタ(maxMovePerTurn)を入れるのは Stage2 任意拡張に格下げ(Stage1 は無くても turn 不消費で成立)。

## contactModel
stepCarrier 末尾で接触判定し、自動でコマンドバトルへ遷移する。判定は既存 nearestOpponent(carrier)(L1624)+ distance(carrier, def)(L1643)を使い、閾値 d<14(既存の engage-strong=18 / threat engaged=18 より少し近い体感良値)で接触成立。接触したら openBattle("dribble") を1行呼ぶだけ(L1760)。openBattle は VS画面→tier選択(通常/スペル/究極)→resolveBattle("dribble") 分岐(L1854-1885)まで既存フローを完全自走するため、新規コードは「接触したら openBattle を呼ぶ」のみ。抜く/奪われるは resolveBattle dribble の atk>=def(advanceCarrier 前進 + showJudge("break"))/ atk<def(turnover + showJudge("stop") + hitstop)が既に実装済。回避は移動操作で表現(接触前に A/D で y をずらして守備者脇を抜ける)ので、バトルメニューに「避ける」を足さない=テンポ維持。接触が無い間は stepCarrier 末尾で render() するだけで次の W 入力待ち(=コマンド待ち継続、追加クリック0)。openBattle 内の pass ピッカー分岐(L1762)や因縁VN分岐(L1774)も無改修で乗る。

## aiModel
Stage1 では AI に盤面歩行を実装しない(enemyTurn は現状維持)。理由: enemyTurn(L2250)は aiPickAction→openBattle/team→setTimeout(tryResolve)の遅延チェーンと matchToken(L2252)照合で動いており、ここに多ステップ移動を差し込むと tryResolve のタイマーツリーが複雑化し matchAlive ガードが迷路化する(Lens3 リスク2)。よって Stage1 は「敵は従来どおり1手で前進(advanceCarrier が resolveBattle 内で前進量を担う L1865)」のまま、プレイヤーだけが歩行する非対称で出す。Stage4(後追い)で AI 自走を足す場合: enemyTurn の action==="dribble" かつ goalDistance(carrier)>=24 のとき、advanceCarrier(carrier, ~7)+moveAiPlayers()+maybeTriggerInterrupt(carrier)(L2232、away carrier に home DF が迫ると32%でタックル/インターセプト割り込み=既に実装済)を発火し、割り込みありなら render してユーザー待ち、なしなら setActionScene+endTurn() で gate 1手見せ。possession は away のままなので advancePlay→再 enemyTurn で次の1歩(自走ループ)。ゴール前(<24)で従来どおり aiPickAction が shoot を選び home GK gkChoice へ。AI 側も「歩では turn 非消費、結果で turn+1」を home と統一。

## turnCounterFix
問題の核心は「endTurn() が turn+1 する(L2176)」点にあり、歩行で endTurn を呼ぶと maxTurns=30(L1377)が即枯渇しハーフタイム(turn===16, L2179)もズレる。解決: stepCarrier は endTurn() を一切呼ばず render() を直接呼ぶ(=move と turn を構造的に分離)。turn が +1 されるのは「resolveBattle 系が結果確定時に呼ぶ endTurn()」だけに限定され、これは現状の挙動と完全に同一なので 30ターン制・ハーフタイム・BGM 切替(L2193-2195)・勝敗判定(L2196)・XP付与(L2204)が1行も変わらない。歩行は turn を触らないので「1ターン=プレイヤーが数歩ドリブル → 接触/シュート/パスで結果 → endTurn で turn+1 → 敵1手」という緩急が自然に生まれる。任意拡張として「1ターン内の最大歩数 maxMovePerTurn」を入れたい場合は state.match.moveCounter を kickoff/endTurn でリセットし、上限到達で自動的に openBattle か gate に落とすが、Stage1 では不要(turn 非消費なので無制限歩行でもゲーム時間が枯れない)。

## testImpact
既存38テスト(tests/smoke.spec.js)への影響は Step1〜3 では原則ゼロ。理由: (1) ArrowUp/Left/Right/Down と 1-4 のコマンド発火を一切変えないため『keyboard arrow keys trigger commands』(L251、ArrowUp→.battle-card)が通る — これが WASD を移動に選んだ最大の根拠。(2) コマンドパネルは既存4ボタン+command-title を保持し『↑前進』を追加するだけなので『captain-tsubasa-like cross layout』(L114-123)が通る。(3) stepCarrier は endTurn を呼ばず turn を触らないので TURN表示『TURN 1 / 30』(L21)・ハーフタイム・勝敗判定系テストに無影響。(4) state.advance を立てないので『paced play-by-play』(L331)『message-advance』系に無影響。(5) carrier.x/y のみ更新で initialSlot 不変なので『position reset stays consistent』(L405)『goalkeepers stay in front』(L138)に無影響。要更新点: 新規挙動の回帰防止に『W キーで保持者が前進し、接触するとドリブルバトルが開く』という追加テストを1本書くのが望ましい(必須ではないが Step1 の手応え確認用)。moveCounter を導入する Step4 のみ、resumeMatch の旧セーブ(moveCounter 欠落)で undefined→NaN 伝播を防ぐデフォルト初期化(moveCounter||0)を入れ、それを確認する assert を追加。

## stateChanges
- 【新規関数】stepCarrier(yBias) — getCarrier() を取り、advanceCarrier ロジックを縮小流用して x を STEP=6〜8 前進・y を yBias(±10)で寄せ clamp、moveAiPlayers() を1回呼び、末尾で nearestOpponent+distance<14 なら openBattle('dribble') を呼び、非接触なら render()。endTurn は呼ばない(turn 非消費)。
- 【新規関数(任意)】carrierCanMove() — state.screen==='match' && match && !finished && possession==='home' && !battle && !advance && !passPicker && !gkChoice && !interrupt && !vnScene を満たすか。disableHomeTurn()(L3408)と同条件 + advance/vnScene 追加。
- 【修正】bindKeyboardEvents()(L3589)— L3652 の home ターン分岐に WASD ガードを追加: w/W→stepCarrier(0)、a/A→stepCarrier(-10)、d/D→stepCarrier(10)、(任意)s/S→後退。既存 ArrowUp/Left/Right/Down=1-4 のコマンド発火は1行も変えない。
- 【修正】renderMatch() コマンドパネル(L2889-2899)— 既存4クロスボタンを保持したまま『↑ 前進 (W)』ボタンを1個追加(data-action='step' 等)。command-title『どうする？』は維持。
- 【修正】bindEvents()(L3517 付近)— action==='step' で stepCarrier(0) を呼ぶ分岐を1個追加(クリック操作用、キーボードと同等)。
- 【セーブ非対象】stepCarrier は新 state フィールドを増やさず carrier.x/y のみ更新するため、saveMatch(L223)が既に x/y を保存しており追加の serialize 不要。moveCounter を導入する場合のみ startMatchCore(L1372) と kickoff(L2144) と resumeMatch(L251) に moveCounter:0 のデフォルト初期化を足す。

## keepIntact
- メッセージ送りゲート: gate()(L1241)/advancePlay()(L1251)/state.advance を一切変更しない。stepCarrier は advance を立てず render 直呼びなので L3610 の送り待ち分岐と競合しない。テスト『each action pauses for message-advance』(L331)『paced play-by-play』を保護。
- コマンドバトル: openBattle(L1760)/resolveBattle(L1838)/tier選択(通常/スペル/究極)/VS画面/カットイン/GK戦(gkChoice)/連携を無改修。テスト『campaign match starts and resolves a command battle』(L14)『spell command shows dedicated cut-in art』(L55)等を保護。
- AI: enemyTurn(L2250)/aiPickAction/aiPickTier/maybeTriggerInterrupt(L2232)/matchToken 照合/tryResolve 遅延チェーンを Stage1 では一切触らない。
- turn 経済: endTurn(L2171)の turn+1・maxTurns=30・ハーフタイム(turn===16)・BGM切替・勝敗/XP/campaign clear を不変に保つ(stepCarrier が endTurn を呼ばないことで自動的に保護)。
- セーブ/再開: saveMatch(L223)/loadMatch/resumeMatch(L251)/matchToken 再増加/cancelPendingTimers(L1281)を不変。stepCarrier は新 timer を持たず render 直呼びなので cancelPendingTimers への追記不要。テスト『mid-match save and resume』(L267)を保護。
- コマンド UI クロスレイアウト: command-title『どうする？』+ ↑ドリブル/←パス/→シュート/↓連携の4ボタンを消さず追加のみ。テスト『captain-tsubasa-like cross layout』(L114)を保護。
- 既存キーボード: ArrowUp/Left/Right/Down と 1-4 のコマンド発火を不変。テスト『keyboard arrow keys trigger commands』(L251、ArrowUp→battle-card)を保護(これが WASD 採用の決定打)。
- resetPositions(L2152)/initialSlot/keepGoalkeeperInGoal(L2166)/roleBounds(L2471): stepCarrier は initialSlot を書き換えず carrier.x/y のみ動かすのでキックオフ復帰のズレが出ない。テスト『position reset stays consistent』(L405)を保護。

## incrementalSteps
1. Step1 (1つ動く最小版): stepCarrier(yBias) を新設(x 前進+y バイアス+moveAiPlayers 1回+接触<14 で openBattle('dribble')+非接触で render、endTurn 非呼出)。bindKeyboardEvents の home ターン分岐に w/a/d → stepCarrier を追加。これだけで『W連打で歩いて敵に当たると既存ドリブルバトルが自動発火』が動く。矢印/数字コマンドは不変なので全38テスト無影響。
2. Step2 (操作の見える化): renderMatch コマンドパネルに『↑前進(W)』大ボタンを追加 + bindEvents に data-action='step' 分岐。クリックでも歩けるようにし、キーガイド表示を更新。既存4ボタンは保持。
3. Step3 (回避と緩急): A/D の斜め前進(y±10)を調整し、接触前に守備者脇を抜ける『かわす』を移動操作として成立させる。接触閾値 14 と threat overlay(L3238)engaged=18 の見た目整合を CSS で微調整。
4. Step4 (任意・後追い): moveCounter/maxMovePerTurn を state.match に足し、1ターンの歩数上限を設定(startMatchCore/kickoff/resumeMatch にデフォルト初期化)。turn 経済の緊張感を強める。
5. Step5 (任意・後追い): AI 自走歩行を enemyTurn の dribble 分岐に追加(goalDistance>=24 で advanceCarrier+moveAiPlayers+maybeTriggerInterrupt、結果で endTurn)。敵がジリジリ攻め上がる過程を1手ずつ gate で見せる。tryResolve/matchToken 競合に注意して最後に入れる。

## risks
- render() が app.innerHTML 全置換(L2726)であるため CSS transition が再描画ごとに破棄され『スムーズ補間』は構造上不可。1歩=離散ジャンプにしか見えず、歩幅が大きすぎると『ワープ』感が出る。STEP=6〜8 と接触閾値14のチューニングで人間が知覚できる『間』を作る必要がある(最大リスク・要実機調整)。
- WASD は左手前提で、矢印コマンドと両手操作になる学習コスト。タッチ/モバイルでは WASD が使えず『↑前進』ボタン頼みになるため、ボタン UI の押しやすさが体験を左右する。
- 接触自動発火(<14)が頻発すると、歩く前にすぐバトルに入って『歩いてる感』が削がれる恐れ。敵密集エリアでは1歩で接触するため、閾値とフィールド配置(moveAiPlayers の ballPull)のバランス調整が要る。
- Step5 で AI 自走を入れた場合、enemyTurn の setTimeout(tryResolve)+matchToken チェーンに歩行ループを重ねると、画面遷移/再戦時の破棄済み battle 誤射や二重 endTurn のリスク。matchAlive ガードの徹底が必要(Stage1 では回避済だが拡張時に再燃)。
- moveCounter を後付けする場合、saveMatch は自動シリアライズするが旧セーブ復元時に undefined→NaN 伝播の恐れ。resumeMatch/kickoff/startMatchCore の3箇所すべてでデフォルト初期化しないと『position reset』『save/resume』テストが落ちる可能性。
