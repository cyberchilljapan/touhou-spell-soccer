import argparse
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

from generate_character_portraits import CHARACTERS

COMFY = "http://127.0.0.1:8188"
ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "assets" / "cutins"

NEGATIVE = (
    "lowres, blurry, worst quality, bad anatomy, bad hands, extra fingers, "
    "missing fingers, extra limbs, text, logo, watermark, signature, nsfw, nude"
)

CUTIN_OVERRIDES = {
    "reimu": "hakurei reimu, touhou project, shrine maiden soccer captain unleashing fantasy seal save, red white spell circles, soccer ball energy",
    "remilia": "remilia scarlet, touhou project, vampire soccer striker unleashing spear of fate shot, crimson aura, bat wing energy",
    "aya": "shameimaru aya, touhou project, tengu soccer captain sprinting with wind dribble, storm lines, newspaper feather motif",
    "kaguya": "houraisan kaguya, touhou project, moon princess soccer midfielder casting eternal night pass, lunar light, bamboo shadows",
    "satori": "komeiji satori, touhou project, mind reading soccer captain activating third eye pass cut, heart spell aura",
    "byakuren": "hijiri byakuren, touhou project, buddhist soccer striker casting scripture shot, golden sutra rings, temple light",
    "miko": "toyosatomimi no miko, touhou project, noble soccer striker firing seventeen article laser shot, purple gold lightning",
    "shinmyoumaru": "sukuna shinmyoumaru, touhou project, tiny rebel soccer striker swinging miracle mallet trick shot, giant glowing ball",
    # Hakurei extras
    "cirno": "cirno, touhou project, ice fairy soccer midfielder unleashing icicle fall, freezing snowflake energy, blue aura",
    "marisa": "kirisame marisa, touhou project, witch soccer striker firing master spark beam, golden laser, broom posing",
    "youmu": "konpaku youmu, touhou project, swordswoman soccer midfielder unleashing half ghost double touch, slashing aura",
    # Kouma extras
    "flandre": "flandre scarlet, touhou project, vampire soccer striker unleashing forbidden levantine, four wings of light, red destruction beam",
    "sakuya": "izayoi sakuya, touhou project, maid soccer captain stopping time interception, frozen background knives orbiting",
    # Youkai extras
    "kanako": "yasaka kanako, touhou project, goddess soccer striker casting onbashira pillar shot, sacred ropes, divine wind",
    "nitori": "kawashiro nitori, touhou project, kappa soccer midfielder firing gadget trick pass, mechanical sparkles",
    # Eientei extras
    "reisen": "reisen udongein inaba, touhou project, rabbit soldier soccer midfielder casting lunatic mind eye feint, purple wave",
    "mokou": "fujiwara no mokou, touhou project, phoenix soccer striker firing phoenix volley, flaming bird aura",
    # Chireiden extras
    "koishi": "komeiji koishi, touhou project, subconscious soccer striker unleashing rorschach dribble, third eye chained heart",
    "utsuho": "reiuji utsuho, touhou project, hell raven soccer striker firing nuclear melt shot, sun control rod, atomic fire",
    # Myouren extras
    "shou": "toramaru shou, touhou project, tiger disciple soccer midfielder firing treasure tower laser pass, golden pagoda light",
    # Shinreibyo extras
    "futo": "mononobe no futo, touhou project, taoist soccer midfielder casting spinning plate pass curve, wind plate vortex",
    "tojiko": "soga no tojiko, touhou project, ghost soccer midfielder firing thunder middle shot, electric crackle, pot relic",
    # Rebel extras
    "yachie": "kicchou yachie, touhou project, dragon turtle soccer commander invoking boss command spell, draconic seal",
    "seija": "kijin seija, touhou project, amanojaku soccer midfielder reversing field with inverted feint, upside down logo",
}

LEGACY_CUTINS = [
    ("reimu", "hakurei reimu, touhou project, shrine maiden futsal captain unleashing fantasy seal save, red white spell circles, soccer ball energy"),
    ("remilia", "remilia scarlet, touhou project, vampire futsal striker unleashing spear of fate shot, crimson aura, bat wing energy"),
    ("aya", "shameimaru aya, touhou project, tengu futsal captain sprinting with wind dribble, storm lines, newspaper feather motif"),
    ("kaguya", "houraisan kaguya, touhou project, moon princess futsal midfielder casting eternal night pass, lunar light, bamboo shadows"),
    ("satori", "komeiji satori, touhou project, mind reading futsal captain activating third eye pass cut, heart spell aura"),
    ("byakuren", "hijiri byakuren, touhou project, buddhist futsal striker casting scripture shot, golden sutra rings, temple light"),
    ("miko", "toyosatomimi no miko, touhou project, noble futsal striker firing seventeen article laser shot, purple gold lightning"),
    ("shinmyoumaru", "sukuna shinmyoumaru, touhou project, tiny rebel futsal striker swinging miracle mallet trick shot, giant glowing ball"),
]


def all_cutins():
    items = []
    for _team_id, char_id, prompt in CHARACTERS:
        cutin_prompt = CUTIN_OVERRIDES.get(
            char_id,
            f"{prompt}, casting signature spell futsal special move, soccer ball energy impact",
        )
        items.append((char_id, cutin_prompt))
    return items


def request_json(path, payload=None):
    if payload is None:
        with urllib.request.urlopen(f"{COMFY}{path}", timeout=15) as res:
            return json.loads(res.read().decode("utf-8"))
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{COMFY}{path}",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as res:
        return json.loads(res.read().decode("utf-8"))


def workflow(char_id, prompt, seed):
    positive = (
        f"{prompt}, dramatic anime game special move cut-in, wide cinematic composition, "
        "diagonal speed lines, intense lighting, futsal arena background, no text, "
        "clean cel shading, polished doujin game art, masterpiece, best quality"
    )
    return {
        "1": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": "songmix_v13.safetensors"}},
        "2": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["1", 1], "text": positive}},
        "3": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["1", 1], "text": NEGATIVE}},
        "4": {"class_type": "EmptyLatentImage", "inputs": {"width": 768, "height": 448, "batch_size": 1}},
        "5": {
            "class_type": "KSampler",
            "inputs": {
                "model": ["1", 0],
                "positive": ["2", 0],
                "negative": ["3", 0],
                "latent_image": ["4", 0],
                "seed": seed,
                "steps": 26,
                "cfg": 4.5,
                "sampler_name": "euler_ancestral",
                "scheduler": "normal",
                "denoise": 1,
            },
        },
        "6": {"class_type": "VAEDecode", "inputs": {"samples": ["5", 0], "vae": ["1", 2]}},
        "7": {"class_type": "SaveImage", "inputs": {"images": ["6", 0], "filename_prefix": f"touhou_spell_futsal/cutins/{char_id}"}},
    }


def wait_for_prompt(prompt_id):
    for _ in range(180):
        history = request_json(f"/history/{urllib.parse.quote(prompt_id)}")
        if prompt_id in history:
            return history[prompt_id]
        time.sleep(1)
    raise TimeoutError(f"ComfyUI prompt timed out: {prompt_id}")


def download_output(image_info, dest):
    query = urllib.parse.urlencode(
        {
            "filename": image_info["filename"],
            "subfolder": image_info.get("subfolder", ""),
            "type": image_info.get("type", "output"),
        }
    )
    with urllib.request.urlopen(f"{COMFY}/view?{query}", timeout=30) as res:
        dest.write_bytes(res.read())


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--limit", type=int, default=0)
    args = parser.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    stats = request_json("/system_stats")
    print(f"ComfyUI OK: {stats['system']['comfyui_version']}")

    items = all_cutins()
    if args.limit:
        items = items[: args.limit]
    manifest = {}
    for index, (char_id, prompt) in enumerate(items):
        dest = OUT_DIR / f"{char_id}.png"
        if dest.exists() and dest.stat().st_size > 10_000 and not args.force:
            print(f"skip existing {dest.name}")
            manifest[char_id] = str(dest.relative_to(ROOT)).replace("\\", "/")
            continue
        seed = 260528000 + index
        print(f"generate {char_id} seed={seed}")
        queued = request_json("/prompt", {"prompt": workflow(char_id, prompt, seed), "client_id": "touhou_spell_futsal_cutins"})
        history = wait_for_prompt(queued["prompt_id"])
        images = []
        for output in history.get("outputs", {}).values():
            images.extend(output.get("images", []))
        if not images:
            raise RuntimeError(f"No image output for {char_id}")
        download_output(images[0], dest)
        manifest[char_id] = str(dest.relative_to(ROOT)).replace("\\", "/")
        print(f"saved {dest}")

    existing = OUT_DIR / "manifest.json"
    current = json.loads(existing.read_text(encoding="utf-8")) if existing.exists() else {}
    current.update(manifest)
    existing.write_text(json.dumps(current, ensure_ascii=False, indent=2), encoding="utf-8")
    print("done")


if __name__ == "__main__":
    main()
