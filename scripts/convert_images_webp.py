#!/usr/bin/env python3
"""Convert site images to WebP and update HTML references."""
from __future__ import annotations

import io
import re
import sys
from pathlib import Path

import requests
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "images"
RASTER = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tif", ".tiff"}
SKIP_DIRS = {".git", "scripts", "__pycache__"}

# Unsplash photo slug (id-hash) -> local webp basename (under images/)
UNSPLASH_MAP = {
    "1568605114967-8130f3a36994": "hero-quebec-region",
    "1600607687939-ce8a6c25118c": "interior-luxe",
    "1600585154340-be6161a56a0c": "exterieur-propriete",
    "1515238152791-8216bfdf89a7": "hero-tropical-coast",
    "1512813195386-6cf811ad3542": "mexique-tulum",
    "1574227492706-f65b24c3688a": "panama",
    "1600880292203-757bb62b4baf": "equipe-bureau",
    "1560518883-ce09059eeffa": "evaluation-maison",
    "1600596542815-ffad4c1539a9": "vente-quebec",
    "1499793983690-e29da59ef1c2": "international-plage",
    "1554224311-beee415c201f": "hypotheque-comparaison",
    "1609220136736-4435a41320e3": "famille-maison",
}

# Explicit renames for cleaner paths
LOCAL_RENAMES = {
    "AdobeStock_297746725.jpeg": "images/military-family.webp",
    "headerres.jpeg": "images/header-residentiel.webp",
    "mathieu.png": "images/mathieu.webp",
    "catherine.png": "images/catherine.webp",
    "apoint-assets/Apoint-Logo-RGB-Cabinet-Vert-renverse.png": "apoint-assets/apoint-logo-vert-renverse.webp",
    "apoint-assets/Code QR MC Équipe International.png": "apoint-assets/qr-mc-equipe-international.webp",
}


def is_photo(path: Path) -> bool:
    return path.suffix.lower() in RASTER


def resize_if_needed(img: Image.Image, max_width: int) -> Image.Image:
    if img.width <= max_width:
        return img
    ratio = max_width / img.width
    size = (max_width, max(1, round(img.height * ratio)))
    return img.resize(size, Image.Resampling.LANCZOS)


def save_webp(
    src: Path,
    dest: Path,
    *,
    max_width: int = 1920,
    quality: int = 84,
    lossless: bool = False,
) -> tuple[int, int]:
    dest.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as img:
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGBA" if "A" in img.getbands() else "RGB")
        img = resize_if_needed(img, max_width)
        if lossless:
            img.save(dest, "WEBP", lossless=True, method=6)
        else:
            img.save(dest, "WEBP", quality=quality, method=6)
        return src.stat().st_size, dest.stat().st_size


def download_unsplash(slug: str, dest: Path, width: int = 1920) -> None:
    url = f"https://images.unsplash.com/photo-{slug}?auto=format&fit=crop&w={width}&q=85"
    resp = requests.get(url, timeout=60)
    resp.raise_for_status()
    img = Image.open(io.BytesIO(resp.content))
    img = resize_if_needed(img, width)
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGB")
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "WEBP", quality=84, method=6)


def webp_for_local(path: Path) -> Path:
    rel = path.relative_to(ROOT).as_posix()
    if rel in LOCAL_RENAMES:
        return ROOT / LOCAL_RENAMES[rel]
    if path.parent.name == "apoint-assets":
        return path.with_suffix(".webp")
    if path.parent == ROOT:
        return IMAGES / f"{path.stem}.webp"
    return path.with_suffix(".webp")


def convert_all_local() -> dict[str, str]:
    mapping: dict[str, str] = {}
    for path in sorted(ROOT.rglob("*")):
        if not path.is_file() or not is_photo(path):
            continue
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if path.suffix.lower() == ".webp":
            continue

        rel_src = path.relative_to(ROOT).as_posix()
        dest = webp_for_local(path)
        rel_dest = dest.relative_to(ROOT).as_posix()

        is_logo_or_qr = "logo" in path.name.lower() or "qr" in path.name.lower() or "code qr" in path.name.lower()
        is_portrait = path.name.lower() in {"mathieu.png", "catherine.png"}
        max_w = 800 if is_portrait else (1200 if "apoint" in str(path) else 1920)

        try:
            before, after = save_webp(
                path,
                dest,
                max_width=max_w,
                quality=92 if is_logo_or_qr else 84,
                lossless=is_logo_or_qr,
            )
            mapping[rel_src] = rel_dest
            mapping[path.name] = rel_dest
            print(f"  {rel_src} ({before // 1024} KB) -> {rel_dest} ({after // 1024} KB)")
        except Exception as exc:
            print(f"  SKIP {rel_src}: {exc}", file=sys.stderr)

    return mapping


def ensure_unsplash() -> dict[str, str]:
    mapping: dict[str, str] = {}
    IMAGES.mkdir(exist_ok=True)
    for slug, basename in UNSPLASH_MAP.items():
        dest = IMAGES / f"{basename}.webp"
        if dest.exists():
            rel = dest.relative_to(ROOT).as_posix()
            mapping[slug] = rel
            continue
        width = 2000 if basename.startswith("hero-") else 1200
        print(f"  Downloading Unsplash {slug} -> {dest.name}")
        try:
            download_unsplash(slug, dest, width=width)
        except requests.HTTPError as exc:
            fallback = IMAGES / "military-family.webp"
            if fallback.exists() and basename == "famille-maison":
                import shutil

                shutil.copy2(fallback, dest)
                print(f"  Fallback {dest.name} <- military-family.webp ({exc.response.status_code})")
            else:
                raise exc
        mapping[slug] = dest.relative_to(ROOT).as_posix()
    return mapping


def update_html(local_map: dict[str, str], unsplash_map: dict[str, str]) -> None:
    unsplash_re = re.compile(
        r"https://images\.unsplash\.com/photo-([\d]+-[a-f0-9]+)[^\"']*",
        re.IGNORECASE,
    )

    for html_path in sorted(ROOT.glob("*.html")):
        text = html_path.read_text(encoding="utf-8")
        original = text

        def repl_unsplash(match: re.Match[str]) -> str:
            slug = match.group(1)
            if slug in unsplash_map:
                return unsplash_map[slug]
            return match.group(0)

        text = unsplash_re.sub(repl_unsplash, text)

        # Longest paths first to avoid partial replacements
        for src in sorted(local_map.keys(), key=len, reverse=True):
            dest = local_map[src]
            if src in text:
                text = text.replace(src, dest)

        if text != original:
            html_path.write_text(text, encoding="utf-8")
            print(f"  Updated {html_path.name}")


def remove_sources(local_map: dict[str, str]) -> None:
    removed = set()
    seen_paths: set[Path] = set()
    for src in local_map:
        path = (ROOT / src).resolve()
        if not path.is_relative_to(ROOT):
            continue
        if path in seen_paths:
            continue
        seen_paths.add(path)
        if path.exists() and path.suffix.lower() in RASTER:
            path.unlink()
            removed.add(path.relative_to(ROOT).as_posix())
    for item in sorted(removed):
        print(f"  Removed {item}")


def main() -> None:
    print("Converting local images…")
    local_map = convert_all_local()
    print("\nFetching / verifying Unsplash assets…")
    unsplash_map = ensure_unsplash()
    print("\nUpdating HTML…")
    update_html(local_map, unsplash_map)
    print("\nRemoving original raster files…")
    remove_sources(local_map)
    print("\nDone.")


if __name__ == "__main__":
    main()
