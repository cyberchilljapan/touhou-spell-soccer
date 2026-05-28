import argparse
import json
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


COMFY = "http://127.0.0.1:8188"
ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "assets" / "team_cg"

NEGATIVE = (
    "lowres, blurry, worst quality, bad anatomy, extra fingers, missing fingers, "
    "extra limbs, deformed hands, text, logo, watermark, signature, nsfw, nude, "
    "messy crowd, duplicate face, fused bodies"
)

ASSETS = [
    {
        "id": "hakurei",
        "name": "hakurei_team",
        "prompt": "hakurei reimu, touhou project, soccer captain in front, kirisame marisa and kochiya sanae and ibuki suika as teammates behind, 4girls, red white soccer uniform inspired by shrine maiden outfit, captain holding soccer ball, indoor soccer arena, spell card energy, clean cel shading, polished doujin game key visual, team poster composition",
    },
    {
        "id": "kouma",
        "name": "kouma_team",
        "prompt": "remilia scarlet, touhou project, vampire soccer captain in front, izayoi sakuya and hong meiling and patchouli knowledge as teammates behind, 4girls, elegant crimson soccer uniform with small bat wing motif, captain raising arm, night indoor soccer arena, scarlet spell card aura, clean cel shading, polished doujin game key visual, team poster composition",
    },
    {
        "id": "youkai_mountain",
        "name": "youkai_mountain_team",
        "prompt": "shameimaru aya, touhou project, tengu soccer captain sprinting with soccer ball in front, inubashiri momiji and kawashiro nitori and yasaka kanako as teammates behind, 4girls, black white red sport uniform, wind spell effects, mountain shrine soccer arena, clean cel shading, polished doujin game key visual, team poster composition",
    },
    {
        "id": "eientei",
        "name": "eientei_team",
        "prompt": "houraisan kaguya, touhou project, elegant moon princess soccer midfielder in front, yagokoro eirin and reisen udongein inaba and fujiwara no mokou as teammates behind, 4girls, navy white soccer uniform inspired by kimono, bamboo forest arena, lunar spell particles, clean cel shading, polished doujin game key visual, team poster composition",
    },
    {
        "id": "chireiden",
        "name": "chireiden_team",
        "prompt": "komeiji satori, touhou project, underground palace soccer captain in front, pink hair third eye motif, kaenbyou rin and reiuji utsuho and hoshiguma yuugi as teammates behind, 4girls, purple soccer uniform, dark volcanic arena, heart spell effects, clean cel shading, polished doujin game key visual, team poster composition",
    },
    {
        "id": "myouren",
        "name": "myouren_team",
        "prompt": "hijiri byakuren, touhou project, buddhist temple soccer striker captain in front, long gradient hair, toramaru shou and kumoi ichirin and nazrin as teammates behind, 4girls, black white gold soccer uniform, temple arena, golden scripture spell effects, clean cel shading, polished doujin game key visual, team poster composition",
    },
    {
        "id": "shinreibyo",
        "name": "shinreibyo_team",
        "prompt": "toyosatomimi no miko, touhou project, noble mausoleum soccer striker captain in front, headphones, mononobe no futo and soga no tojiko and kaku seiga as teammates behind, 4girls, purple gold soccer uniform, lightning taoist spell effects, indoor arena, clean cel shading, polished doujin game key visual, team poster composition",
    },
    {
        "id": "rebel_beast",
        "name": "rebel_beast_team",
        "prompt": "sukuna shinmyoumaru, touhou project, tiny rebel soccer striker captain in front, kijin seija and imaizumi kagerou and kicchou yachie as teammates behind, 4girls, red blue soccer uniform, miracle mallet motif, dynamic dribble pose, chaotic arena, clean cel shading, polished doujin game key visual, team poster composition",
    },
]


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


def workflow(asset, seed):
    return {
        "1": {
            "class_type": "CheckpointLoaderSimple",
            "inputs": {"ckpt_name": "songmix_v13.safetensors"},
        },
        "2": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "clip": ["1", 1],
                "text": asset["prompt"] + ", masterpiece, best quality, high detail",
            },
        },
        "3": {
            "class_type": "CLIPTextEncode",
            "inputs": {"clip": ["1", 1], "text": NEGATIVE},
        },
        "4": {
            "class_type": "EmptyLatentImage",
            "inputs": {"width": 768, "height": 512, "batch_size": 1},
        },
        "5": {
            "class_type": "KSampler",
            "inputs": {
                "model": ["1", 0],
                "positive": ["2", 0],
                "negative": ["3", 0],
                "latent_image": ["4", 0],
                "seed": seed,
                "steps": 28,
                "cfg": 4.5,
                "sampler_name": "euler_ancestral",
                "scheduler": "normal",
                "denoise": 1,
            },
        },
        "6": {
            "class_type": "VAEDecode",
            "inputs": {"samples": ["5", 0], "vae": ["1", 2]},
        },
        "7": {
            "class_type": "SaveImage",
            "inputs": {"images": ["6", 0], "filename_prefix": f"touhou_spell_futsal/{asset['name']}"},
        },
    }


def wait_for_prompt(prompt_id):
    for _ in range(240):
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
    parser.add_argument("--force", action="store_true", help="Regenerate even if file exists")
    args = parser.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    stats = request_json("/system_stats")
    print(f"ComfyUI OK: {stats['system']['comfyui_version']}")

    manifest = {}
    for index, asset in enumerate(ASSETS):
      dest = OUT_DIR / f"{asset['id']}.png"
      if dest.exists() and dest.stat().st_size > 10_000 and not args.force:
          print(f"skip existing {dest.name}")
          manifest[asset["id"]] = str(dest.relative_to(ROOT)).replace("\\", "/")
          continue

      seed = 260528100 + index
      print(f"generate {asset['id']} seed={seed}")
      queued = request_json("/prompt", {"prompt": workflow(asset, seed), "client_id": "touhou_spell_futsal"})
      prompt_id = queued["prompt_id"]
      history = wait_for_prompt(prompt_id)
      images = []
      for output in history.get("outputs", {}).values():
          images.extend(output.get("images", []))
      if not images:
          raise RuntimeError(f"No image output for {asset['id']}")
      download_output(images[0], dest)
      manifest[asset["id"]] = str(dest.relative_to(ROOT)).replace("\\", "/")
      print(f"saved {dest}")

    (OUT_DIR / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print("done")


if __name__ == "__main__":
    try:
        main()
    except urllib.error.URLError as exc:
        raise SystemExit(f"ComfyUI connection failed: {exc}") from exc
