"""88 portrait + 88 cutin + 8 team_cg をまとめた grid 連絡シートを生成 (QA 用)。

PIL のみ依存 (Python 標準でないため、未導入なら pip install Pillow)。
出力:
  contact_sheet_portraits.jpg  — 88 portrait を 11x8 grid で配置 (各 team 1 行)
  contact_sheet_cutins.jpg     — 88 cutin   を 11x8 grid
  contact_sheet_team_cg.jpg    — 8  team_cg を 4x2 grid
"""

import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Pillow 未導入。 pip install Pillow を実行してください。")
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
PORTRAIT_DIR = ROOT / "assets" / "portraits"
CUTIN_DIR = ROOT / "assets" / "cutins"
TEAM_CG_DIR = ROOT / "assets" / "team_cg"
OUT_DIR = ROOT

# team_id → display name + roster order (TEAMS の順序と一致)
TEAMS_ROSTER = [
    ("hakurei", "博麗神社", ["reimu", "suika", "daiyousei", "rumia", "wriggle", "sanae", "youmu", "kasen", "cirno", "marisa", "lily"]),
    ("kouma", "紅魔館", ["patchouli", "meiling", "koakuma", "lunasa", "tokiko", "sakuya", "merlin", "lyrica", "hecatia", "remilia", "flandre"]),
    ("youkai_mountain", "妖怪山", ["suwako", "momiji", "hina", "shizuha", "medicine", "aya", "nitori", "kogasa", "yuuka", "kanako", "minoriko"]),
    ("eientei", "永遠亭", ["eirin", "tei", "junko", "ringo", "clownpiece", "kaguya", "reisen", "ringo2", "seiran", "mokou", "iku"]),
    ("chireiden", "地霊殿", ["yuugi", "parsee", "yamame", "kisume", "kuroni", "satori", "orin", "kasha", "jigoku", "koishi", "utsuho"]),
    ("myouren", "命蓮寺", ["murasa", "ichirin", "unzan", "mamizou", "myouon", "shou", "nazrin", "kyouko", "nue", "byakuren", "disciple"]),
    ("shinreibyo", "神霊廟", ["yoshika", "seiga", "sogashadow", "mononobe", "guardian", "futo", "tojiko", "futatsuiwa", "tsukuyomi", "miko", "byoudou"]),
    ("rebel_beast", "反逆獣連合", ["mayumi", "kagerou", "oniko", "bakeneko", "kageyachie", "seija", "yachie", "baketanuki", "oniwaka", "shinmyoumaru", "hangyakushi"]),
]


def _font(size=18):
    # CJK 表示可能な日本語フォントを優先 (Windows 標準 + 一般的なパス)
    candidates = [
        "C:/Windows/Fonts/YuGothM.ttc",
        "C:/Windows/Fonts/yugothic.ttc",
        "C:/Windows/Fonts/YuGothR.ttc",
        "C:/Windows/Fonts/meiryo.ttc",
        "C:/Windows/Fonts/meiryob.ttc",
        "C:/Windows/Fonts/msgothic.ttc",
        "C:/Windows/Fonts/MSGothic.ttf",
        "meiryo.ttc",
        "msgothic.ttc",
        "arial.ttf",
    ]
    for name in candidates:
        try:
            return ImageFont.truetype(name, size)
        except (OSError, IOError):
            continue
    return ImageFont.load_default()


def make_grid(src_dir, items, cell_w, cell_h, header_h=28, gap=4, title="", aspect=None):
    cols = 11
    rows = 8
    label_w = 110
    img_w = label_w + cols * (cell_w + gap) + gap
    img_h = header_h + rows * (cell_h + gap) + gap
    sheet = Image.new("RGB", (img_w, img_h), (18, 22, 24))
    draw = ImageDraw.Draw(sheet)
    title_font = _font(20)
    label_font = _font(14)
    cell_font = _font(11)
    draw.text((10, 6), title, fill=(248, 214, 121), font=title_font)
    for ri, (team_id, team_name, roster) in enumerate(items):
        y = header_h + ri * (cell_h + gap) + gap
        draw.text((6, y + cell_h // 2 - 8), team_name, fill=(248, 214, 121), font=label_font)
        for ci, char_id in enumerate(roster):
            x = label_w + ci * (cell_w + gap) + gap
            src = src_dir / f"{char_id}.png"
            try:
                img = Image.open(src).convert("RGB")
                if aspect:
                    img = img.resize((cell_w, cell_h))
                else:
                    img.thumbnail((cell_w, cell_h))
                sheet.paste(img, (x, y))
            except (OSError, IOError):
                draw.rectangle([x, y, x + cell_w, y + cell_h], outline=(80, 30, 30), width=2)
                draw.text((x + 4, y + 4), "MISSING", fill=(220, 80, 80), font=cell_font)
            draw.text((x + 2, y + cell_h - 14), char_id[:14], fill=(255, 255, 220), font=cell_font)
    return sheet


def make_team_cg_grid(items):
    cols = 4
    rows = 2
    cell_w = 320
    cell_h = 200
    header_h = 36
    gap = 8
    img_w = cols * (cell_w + gap) + gap
    img_h = header_h + rows * (cell_h + gap) + gap
    sheet = Image.new("RGB", (img_w, img_h), (18, 22, 24))
    draw = ImageDraw.Draw(sheet)
    title_font = _font(22)
    label_font = _font(14)
    draw.text((10, 8), "Team CG (8 teams)", fill=(248, 214, 121), font=title_font)
    for i, (team_id, team_name, _) in enumerate(items):
        c = i % cols
        r = i // cols
        x = gap + c * (cell_w + gap)
        y = header_h + r * (cell_h + gap) + gap
        src = TEAM_CG_DIR / f"{team_id}.png"
        try:
            img = Image.open(src).convert("RGB").resize((cell_w, cell_h - 22))
            sheet.paste(img, (x, y))
        except (OSError, IOError):
            draw.rectangle([x, y, x + cell_w, y + cell_h - 22], outline=(80, 30, 30), width=2)
        draw.text((x + 6, y + cell_h - 20), f"{team_name} ({team_id})", fill=(248, 214, 121), font=label_font)
    return sheet


def main():
    print("Generating contact sheets...")
    portraits = make_grid(PORTRAIT_DIR, TEAMS_ROSTER, cell_w=96, cell_h=120, title="Portraits 88 (8 teams x 11 players)")
    portraits.save(OUT_DIR / "contact_sheet_portraits.jpg", quality=88)
    print(f"  saved contact_sheet_portraits.jpg ({portraits.size[0]}x{portraits.size[1]})")

    cutins = make_grid(CUTIN_DIR, TEAMS_ROSTER, cell_w=160, cell_h=96, title="Spell Cutins 88 (8 teams x 11 players)", aspect=True)
    cutins.save(OUT_DIR / "contact_sheet_cutins.jpg", quality=88)
    print(f"  saved contact_sheet_cutins.jpg ({cutins.size[0]}x{cutins.size[1]})")

    teams = make_team_cg_grid(TEAMS_ROSTER)
    teams.save(OUT_DIR / "contact_sheet_team_cg.jpg", quality=92)
    print(f"  saved contact_sheet_team_cg.jpg ({teams.size[0]}x{teams.size[1]})")
    print("done")


if __name__ == "__main__":
    main()
