# 東方スペルサッカー

キャプテン翼2/3系の「スポーツに見えるRPG」を、東方サッカー二次創作として作るプロトタイプです。11vs11、30ターン制、88キャラ収録。

## 起動

```powershell
cd C:\Users\stayg\claude_project\touhou_spell_futsal
python -m http.server 8787 -b 127.0.0.1
```

ブラウザで `http://127.0.0.1:8787/` を開きます。

配布版は `index.html` を直接開いても動きます。

## 現在の実装

- 11vs11サッカー (4-4-2 / 4-3-3 / 3-5-2 フォーメーション対応)
- 8チーム / 88キャラ
- 30ターン制
- ストーリー7連戦
- フリー対戦
- 勝利時のチーム解放
- localStorageセーブ
- 勝利/敗北/引き分けのリザルト会話
- 相手チーム別の試合前イベント会話
- EASY/NORMAL/HARD難易度
- 難易度別ストーリー制覇報酬
- WebAudio生成BGM/SE
- 音ON/OFF保存
- 十字キー風の「どうする？」コマンドUI
- ドリブル / パス / シュート / 連携スペル
- 接触時のコマンドバトル
- VN風の実況帯とスプライトアニメ風の行動演出
- 保持者 / 攻撃方向 / 対面相手 / ゴール距離の常時表示
- GKを左右ゴール前に固定する役割別フィールド配置
- 行動別スペル名。シュートではシュート技、パスではパス技を表示
- シュート対GK判定
- 霊力消費と自動回復
- 敵AIの自動行動
- ComfyUI生成の8チーム代表CG
- ComfyUI生成のキャラ個別ポートレート40人分
- ComfyUI生成のスペルカットイン40人分
- チームCG/ポートレート/カットイン閲覧ギャラリー
- ゲーム内ヘルプ

## ComfyUI CG再生成

ComfyUIを `http://127.0.0.1:8188` で起動した状態で実行します。

```powershell
cd C:\Users\stayg\claude_project\touhou_spell_futsal
python scripts\generate_team_cg.py
python scripts\generate_character_portraits.py
python scripts\generate_spell_cutins.py
python scripts\sync_portrait_manifest.py
python scripts\sync_cutin_manifest.py
```

一部チームだけポートレートを作る場合:

```powershell
python scripts\generate_character_portraits.py --teams hakurei kouma
```

## テスト

Microsoft Edgeを使って、試合開始、試合前イベント、十字キー風コマンド、VN風行動演出、役割別フィールド配置、GK固定、行動別スペル名、コマンドバトル、ポートレート、スペルカットイン、セーブ、難易度、難易度別報酬、リザルト会話、ギャラリー、ヘルプ、favicon、file直開きを確認します。

```powershell
npm test
```

## リリースZIP作成

```powershell
npm run package
```

出力先:

- `release/touhou_spell_futsal/`
- `release/touhou_spell_futsal.zip`

ZIP内の `index.html` または `start_game.bat` から起動できます。

## 次の拡張候補

- Electron版ビルド
- スカウトしたキャラでの混成チーム編成
- 外部BGM/SE素材への差し替え
