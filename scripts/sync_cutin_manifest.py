import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CUTIN_DIR = ROOT / "assets" / "cutins"
GAME_JS = ROOT / "src" / "game.js"


def main():
    ids = sorted(path.stem for path in CUTIN_DIR.glob("*.png"))
    manifest = {char_id: f"assets/cutins/{char_id}.png" for char_id in ids}
    (CUTIN_DIR / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    source = GAME_JS.read_text(encoding="utf-8")
    replacement = "const AVAILABLE_CUTINS = new Set([\n"
    replacement += "".join(f'  "{char_id}",\n' for char_id in ids)
    replacement += "]);"
    source = re.sub(
        r"const AVAILABLE_CUTINS = new Set\(\[\n.*?\]\);",
        replacement,
        source,
        flags=re.S,
    )
    GAME_JS.write_text(source, encoding="utf-8")
    print(f"synced {len(ids)} cutins")


if __name__ == "__main__":
    main()
