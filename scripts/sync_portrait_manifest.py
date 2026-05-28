import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PORTRAIT_DIR = ROOT / "assets" / "portraits"
GAME_JS = ROOT / "src" / "game.js"


def main():
    ids = sorted(path.stem for path in PORTRAIT_DIR.glob("*.png"))
    manifest = {char_id: f"assets/portraits/{char_id}.png" for char_id in ids}
    (PORTRAIT_DIR / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    source = GAME_JS.read_text(encoding="utf-8")
    replacement = "const AVAILABLE_PORTRAITS = new Set([\n"
    replacement += "".join(f'  "{char_id}",\n' for char_id in ids)
    replacement += "]);"
    source = re.sub(
        r"const AVAILABLE_PORTRAITS = new Set\(\[\n.*?\]\);",
        replacement,
        source,
        flags=re.S,
    )
    GAME_JS.write_text(source, encoding="utf-8")
    print(f"synced {len(ids)} portraits")


if __name__ == "__main__":
    main()
