#!/bin/bash
# Stage C: 空中シュートCG (ヘディング/オーバーヘッド/ボレー/ダイビングヘッド) を全88体に生成。
# 球高低ロジック(pickAerialShot)実装済。 本パイプライン(gen_pipeline.sh)完了後に実行。
# 透過は generate_anima_actions.py が自動。 skip-existing で再実行安全。
set -e
cd "$(dirname "$0")/.."
PY=/c/ComfyUI/venv/Scripts/python.exe
$PY scripts/generate_anima_actions.py --budget --full --actions header overhead volley diving_header
echo "AERIAL_DONE"
