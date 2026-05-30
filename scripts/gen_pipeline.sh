#!/bin/bash
# アクションCG生成パイプライン (透過は generate_anima_actions.py が自動実行)。
# Stage A: 優先ロスターの仕上げ (tackleをスライドプロンプトで再生成 / intercept_2・contest_2 / GK save)
# Stage B: 全88体のコア7動作 (skip-existing で優先分は温存)
# 空中シュート(aerial)は別ステージ (球高さロジック実装後に生成)。
set -e
cd "$(dirname "$0")/.."
PY=/c/ComfyUI/venv/Scripts/python.exe
PRIORITY="reimu suika daiyousei rumia wriggle sanae youmu kasen cirno marisa lily patchouli meiling koakuma lunasa tokiko sakuya merlin lyrica hecatia remilia flandre"

echo "=== Stage A: tackle 再生成 (旧かがみ込みコマを削除) ==="
rm -f assets/actions/*_tackle_*.png
$PY scripts/generate_anima_actions.py --budget --chars $PRIORITY --actions tackle intercept contest

echo "=== Stage A2: 優先GK save ==="
$PY scripts/generate_anima_actions.py --budget --chars reimu patchouli --actions save

echo "=== Stage B: 全88体コア7動作 ==="
$PY scripts/generate_anima_actions.py --budget --full --actions dribble pass shoot block intercept tackle contest

echo "=== Stage B2: 残りGK save ==="
$PY scripts/generate_anima_actions.py --budget --chars suwako eirin yuugi murasa yoshika mayumi --actions save

echo "PIPELINE_DONE"
