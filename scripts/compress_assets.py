# PNG アセットの一括量子化圧縮 (256色 octree + Floyd-Steinberg)。
# AI生成アニメ調CGはフラット陰影なので 256色で視覚劣化ほぼ無し、実測 ~17% に縮む。
# 使い方:
#   python scripts/compress_assets.py            # assets/ 全PNGを _quantized/ へ出力 (元は触らない)
#   python scripts/compress_assets.py --apply    # 検証後、_quantized/ を assets/ へ反映して削除
# 再生成スクリプト (generate_*.py) を回した後はもう一度実行する。
import argparse
import os
import shutil
import sys
from concurrent.futures import ProcessPoolExecutor

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "assets")
OUT = os.path.join(ROOT, "_quantized")

# 量子化対象 (favicon.svg / ui の小物はスキップしても誤差)
TARGET_DIRS = ["actions", "cutins", "portraits", "team_cg", "anim"]


def compress_one(rel):
    src = os.path.join(ASSETS, rel)
    dst = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    try:
        im = Image.open(src)
        if im.mode == "P":  # 量子化済み
            shutil.copy2(src, dst)
            return (rel, os.path.getsize(src), os.path.getsize(src), "skip")
        if im.mode in ("RGBA", "LA"):
            q = im.quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.FLOYDSTEINBERG)
        else:
            q = im.convert("RGB").quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
        q.save(dst, optimize=True)
        before, after = os.path.getsize(src), os.path.getsize(dst)
        if after >= before:  # 縮まないなら元を使う
            shutil.copy2(src, dst)
            return (rel, before, before, "keep")
        return (rel, before, after, "ok")
    except Exception as e:  # 1枚の失敗で全体を止めない
        shutil.copy2(src, dst)
        return (rel, os.path.getsize(src), os.path.getsize(src), f"error:{e}")


def collect():
    rels = []
    for d in TARGET_DIRS:
        base = os.path.join(ASSETS, d)
        if not os.path.isdir(base):
            continue
        for name in os.listdir(base):
            rel = os.path.join(d, name)
            if name.lower().endswith(".png"):
                rels.append(rel)
            elif os.path.isfile(os.path.join(base, name)):
                # manifest 等の非PNGもコピーして _quantized をそのまま差し替え可能に
                dst = os.path.join(OUT, rel)
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                shutil.copy2(os.path.join(base, name), dst)
    return rels


def apply_quantized():
    if not os.path.isdir(OUT):
        print("_quantized がありません。先に圧縮を実行してください。")
        sys.exit(1)
    for d in TARGET_DIRS:
        src_dir = os.path.join(OUT, d)
        if not os.path.isdir(src_dir):
            continue
        for name in os.listdir(src_dir):
            shutil.move(os.path.join(src_dir, name), os.path.join(ASSETS, d, name))
    shutil.rmtree(OUT)
    print("反映完了。_quantized を削除しました。")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    args = ap.parse_args()
    if args.apply:
        apply_quantized()
        return
    rels = collect()
    print(f"{len(rels)} PNGs を量子化します...")
    total_before = total_after = 0
    errors = 0
    with ProcessPoolExecutor(max_workers=os.cpu_count()) as ex:
        for i, (rel, before, after, status) in enumerate(ex.map(compress_one, rels, chunksize=16)):
            total_before += before
            total_after += after
            if status.startswith("error"):
                errors += 1
                print(f"  FAIL {rel}: {status}")
            if (i + 1) % 200 == 0:
                print(f"  {i + 1}/{len(rels)} ... {total_before // 2**20}MB -> {total_after // 2**20}MB")
    print(f"完了: {total_before // 2**20}MB -> {total_after // 2**20}MB ({100 * total_after // max(1, total_before)}%) / errors={errors}")
    print("確認後 `python scripts/compress_assets.py --apply` で反映。")


if __name__ == "__main__":
    main()
