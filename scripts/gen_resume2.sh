#!/bin/bash
# QA で判明した低品質/衣装誤りキャラを矯正lookで再生成 → 残りコア仕上げ → GK save → 空中シュート全体。
# 透過は generate_anima_actions.py が自動。 1プロンプト失敗はスキップ継続。
set -e
cd "$(dirname "$0")/.."
PY=/c/ComfyUI/venv/Scripts/python.exe
FAILED="byoudou eirin futatsuiwa jigoku kasha kogasa kuroni merlin mononobe myouon patchouli sogashadow suika tojiko tsukuyomi unzan yuugi"
GKS="reimu patchouli suwako eirin yuugi murasa yoshika mayumi"

echo "=== 矯正再生成: 失敗キャラのコアを正しい衣装で (--force) ==="
$PY scripts/generate_anima_actions.py --force --budget --chars $FAILED --actions dribble pass shoot block intercept tackle contest

echo "=== コア仕上げ: 全88体 (skip-existing で残りを消化) ==="
$PY scripts/generate_anima_actions.py --budget --full --actions dribble pass shoot block intercept tackle contest

echo "=== GK save: 旧look の patchouli を削除して全GK生成 ==="
rm -f assets/actions/patchouli_save_*.png
$PY scripts/generate_anima_actions.py --budget --chars $GKS --actions save

echo "=== 空中シュート: 全88体 (失敗キャラは矯正lookで) ==="
$PY scripts/generate_anima_actions.py --budget --full --actions header overhead volley diving_header

echo "RESUME2_DONE"
