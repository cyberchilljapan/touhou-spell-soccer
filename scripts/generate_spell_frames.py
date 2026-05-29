"""必殺技カットインの 2 枚目フレーム (放出/インパクトの瞬間) を生成する。

既存 assets/cutins/{id}.png を frameA (タメ/詠唱) とし、 本スクリプトで
assets/cutins/{id}_b.png (frameB = climax/burst) を生成。 ゲーム側で A<->B を
ディレイ式にめくることでスプライト風アニメにする。

ComfyUI を 127.0.0.1:8188 で起動した状態で実行:
    python scripts/generate_spell_frames.py                 # 全 88 体
    python scripts/generate_spell_frames.py --chars reimu marisa   # 指定のみ
    python scripts/generate_spell_frames.py --limit 8 --force
"""
import argparse
import json
import urllib.request
from pathlib import Path

from generate_spell_cutins import (
    NEGATIVE,
    all_cutins,
    download_output,
    request_json,
    wait_for_prompt,
    ROOT,
)

OUT_DIR = ROOT / "assets" / "cutins"


def workflow_b(char_id, prompt, seed):
    # frameB: 同一キャラ・同一スペルの「放出の瞬間」。 frameA とめくると放った感じになる。
    positive = (
        f"{prompt}, climactic release frame of the special move, spell energy fully unleashed, "
        "blinding burst of light, explosive impact, strong radial motion blur, dynamic follow-through pose, "
        "dramatic anime game special move cut-in, wide cinematic composition, radial speed lines, "
        "intense rim lighting, futsal arena background, no text, clean cel shading, polished doujin game art, "
        "masterpiece, best quality"
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
        "7": {"class_type": "SaveImage", "inputs": {"images": ["6", 0], "filename_prefix": f"touhou_spell_futsal/cutin_frames/{char_id}_b"}},
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--chars", nargs="*", default=None, help="生成する char_id を限定")
    args = parser.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    stats = request_json("/system_stats")
    print(f"ComfyUI OK: {stats['system']['comfyui_version']}")

    items = all_cutins()
    if args.chars:
        wanted = set(args.chars)
        items = [it for it in items if it[0] in wanted]
    if args.limit:
        items = items[: args.limit]

    manifest_path = OUT_DIR / "frames_manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {}

    for index, (char_id, prompt) in enumerate(items):
        dest = OUT_DIR / f"{char_id}_b.png"
        if dest.exists() and dest.stat().st_size > 10_000 and not args.force:
            print(f"skip existing {dest.name}")
            manifest[char_id] = str(dest.relative_to(ROOT)).replace("\\", "/")
            continue
        seed = 360528000 + index  # frameA (260528000+i) と別系列にして別ポーズを引く
        print(f"generate {char_id}_b seed={seed}")
        queued = request_json("/prompt", {"prompt": workflow_b(char_id, prompt, seed), "client_id": "touhou_spell_futsal_frames"})
        history = wait_for_prompt(queued["prompt_id"])
        images = []
        for output in history.get("outputs", {}).values():
            images.extend(output.get("images", []))
        if not images:
            raise RuntimeError(f"No image output for {char_id}_b")
        download_output(images[0], dest)
        manifest[char_id] = str(dest.relative_to(ROOT)).replace("\\", "/")
        print(f"saved {dest}")

    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"done ({len(manifest)} frameB entries)")


if __name__ == "__main__":
    main()
