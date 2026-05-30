"""Anima 動作CG (白背景) の縁の白だけを透過にする (服の内側の白は保持)。

縁(border)から flood fill で連結した近白だけを alpha=0 にするので、 巫女服や
エプロンの内側の白は punch out されない。 ComfyUI venv の Pillow を使用。

    python scripts/cutout_actions.py                 # 全フレームを処理
    python scripts/cutout_actions.py --glob 'reimu_*'
"""
import argparse
import re
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "assets" / "actions"

FRAME_RE = re.compile(r".+_[a-z_]+_\d+\.png$")  # {id}_{action}_{i}.png


def is_near_white(px, thresh):
    return px[0] >= 255 - thresh and px[1] >= 255 - thresh and px[2] >= 255 - thresh


def cutout(path, thresh=38, seed_step=24):
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    px = im.load()
    # 既に透過済み(縁が alpha0)ならスキップ。
    if px[0, 0][3] == 0 and px[w - 1, h - 1][3] == 0:
        return False
    fill = (0, 0, 0, 0)
    seeds = []
    for x in range(0, w, seed_step):
        seeds.append((x, 0)); seeds.append((x, h - 1))
    for y in range(0, h, seed_step):
        seeds.append((0, y)); seeds.append((w - 1, y))
    seeds += [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]
    for (sx, sy) in seeds:
        p = px[sx, sy]
        if p[3] != 0 and is_near_white(p, thresh):
            ImageDraw.floodfill(im, (sx, sy), fill, thresh=thresh)
    im.save(path)
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--glob", default="*_*_*.png")
    ap.add_argument("--thresh", type=int, default=38)
    args = ap.parse_args()
    n = 0
    for p in sorted(OUT_DIR.glob(args.glob)):
        if p.name.startswith("anima_"):
            continue
        if not FRAME_RE.match(p.name):
            continue
        try:
            if cutout(p, args.thresh):
                n += 1
                print(f"cutout {p.name}")
        except Exception as e:
            print(f"!! {p.name}: {e}")
    print(f"done ({n} processed)")


if __name__ == "__main__":
    main()
