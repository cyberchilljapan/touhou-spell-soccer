#!/bin/bash
# 中断したパイプラインの再開 (tackle削除は含まない=スライド再生成済を温存)。
# skip-existing なので既生成分は飛ばして続きから。 1プロンプト失敗はスキップ継続。
set -e
cd "$(dirname "$0")/.."
PY=/c/ComfyUI/venv/Scripts/python.exe

echo "=== Stage B: 全88体コア7動作 (続き) ==="
$PY scripts/generate_anima_actions.py --budget --full --actions dribble pass shoot block intercept tackle contest

echo "=== Stage B2: 残りGK save ==="
$PY scripts/generate_anima_actions.py --budget --chars suwako eirin yuugi murasa yoshika mayumi --actions save

echo "=== Stage C: 空中シュート4種 全88体 ==="
$PY scripts/generate_anima_actions.py --budget --full --actions header overhead volley diving_header

echo "RESUME_PIPELINE_DONE"
