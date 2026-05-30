"""POV-A (シュートvsGK 背後ローアングル) の前景=守備の背中シルエット素材を生成。
実機CT3 の対峙カットで手前に並ぶ「背中向きの選手」を Anima で4体ぶん作る。
前景は暗く/ピント外れで使うので、 髪色/体格だけ変えた汎用バックビューでよい。

  python scripts/generate_pov_foreground.py            # 4体生成
  python scripts/generate_pov_foreground.py --force    # 既存も再生成
"""
import argparse

from generate_spell_cutins import request_json, wait_for_prompt, download_output, ROOT
from cutout_actions import cutout as cutout_white

OUT_DIR = ROOT / "assets" / "ui"

POS_PREFIX = "masterpiece, best quality, score_7, safe. anime, "
# 背中向き・ローアングル・全身・白背景。 顔/正面/ボールは出さない。
FIGS = [
    "a Touhou-style soccer player seen entirely from behind, short bob blue hair, slim build",
    "a Touhou-style soccer player seen entirely from behind, long blonde hair, athletic build",
    "a Touhou-style soccer player seen entirely from behind, brown hair in a side ponytail, sturdy build",
    "a Touhou-style soccer player seen entirely from behind, long straight black hair, tall build",
]
COMMON = ("standing in a defensive guard stance watching the play, arms slightly out from the sides, "
          "viewed from directly behind from a low camera angle looking slightly up, the back of the head and back visible, "
          "plain solid white background, clean cel shading, full body from behind, single character, back view, no ball")
NEG = ("worst quality, low quality, blurry, jpeg artifacts, "
       "front view, facing the viewer, face visible, looking back over shoulder, "
       "soccer ball, ball, football, stadium, crowd, multiple people, text, watermark, "
       "bad anatomy, malformed, extra limbs, fused limbs, blob, amorphous, deformed")


def workflow(idx, look, seed):
    positive = f"{POS_PREFIX}{look}, {COMMON}"
    return {
        "1": {"class_type": "UNETLoader", "inputs": {"unet_name": "anima-base-v1.0.safetensors", "weight_dtype": "default"}},
        "2": {"class_type": "CLIPLoader", "inputs": {"clip_name": "qwen_3_06b_base.safetensors", "type": "stable_diffusion", "device": "default"}},
        "3": {"class_type": "VAELoader", "inputs": {"vae_name": "qwen_image_vae.safetensors"}},
        "4": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["2", 0], "text": positive}},
        "5": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["2", 0], "text": NEG}},
        "6": {"class_type": "EmptyLatentImage", "inputs": {"width": 1024, "height": 1024, "batch_size": 1}},
        "7": {"class_type": "KSampler", "inputs": {"model": ["1", 0], "positive": ["4", 0], "negative": ["5", 0], "latent_image": ["6", 0],
                                                    "seed": seed, "steps": 30, "cfg": 4, "sampler_name": "er_sde", "scheduler": "simple", "denoise": 1}},
        "8": {"class_type": "VAEDecode", "inputs": {"samples": ["7", 0], "vae": ["3", 0]}},
        "9": {"class_type": "SaveImage", "inputs": {"images": ["8", 0], "filename_prefix": f"touhou_spell_futsal/pov/pov_df_{idx}"}},
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    stats = request_json("/system_stats")
    print(f"ComfyUI OK: {stats['system']['comfyui_version']}")
    for i, look in enumerate(FIGS):
        dest = OUT_DIR / f"pov_df_{i}.png"
        if dest.exists() and dest.stat().st_size > 10_000 and not args.force:
            print(f"[{i}] skip {dest.name}"); continue
        seed = 660330000 + i
        print(f"[{i}] pov_df_{i} seed={seed}")
        ok = False
        for attempt in range(2):
            try:
                queued = request_json("/prompt", {"prompt": workflow(i, look, seed + attempt * 11), "client_id": "touhou_pov"})
                history = wait_for_prompt(queued["prompt_id"])
                images = []
                for output in history.get("outputs", {}).values():
                    images.extend(output.get("images", []))
                if not images:
                    raise RuntimeError("No image returned")
                download_output(images[0], dest)
                try:
                    cutout_white(dest)
                except Exception as e:
                    print(f"  cutout fail: {e}")
                print(f"  saved {dest.name}")
                ok = True
                break
            except Exception as e:
                print(f"  !! attempt {attempt + 1} failed: {e}")
        if not ok:
            print(f"  XX skipped {dest.name}")
    print("done")


if __name__ == "__main__":
    main()
