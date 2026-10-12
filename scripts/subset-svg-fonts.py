#!/usr/bin/env python3
"""Subset base64-embedded fonts in Excalidraw SVGs to reduce file size."""
import base64
import io
import re
import sys
from pathlib import Path

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont

DIAGRAMS = Path(__file__).parent.parent / "public" / "diagrams"
THRESHOLD = 100 * 1024  # only process SVGs > 100 KB

# Matches: url(data:font/ttf;base64,...) format("truetype")
# Also handles woff2 and other variants
FONT_RE = re.compile(
    r"url\(data:font/([a-z0-9+.-]+);base64,([A-Za-z0-9+/=]+)\)"
    r"(?:\s*format\(\"([a-z0-9]+)\"\))?"
)

# Matches <text ...>content</text> — content may span multiple lines
TEXT_RE = re.compile(r"<text[^>]*>(.*?)</text>", re.DOTALL)


def extract_chars(svg_content: str) -> str:
    """Extract all visible characters from <text> elements."""
    chars = set()
    for m in TEXT_RE.finditer(svg_content):
        raw = m.group(1)
        # Strip any nested tags (tspan etc.) — keep text content
        text = re.sub(r"<[^>]+>", "", raw)
        # Decode XML entities
        text = (
            text.replace("&amp;", "&")
            .replace("&lt;", "<")
            .replace("&gt;", ">")
            .replace("&quot;", '"')
            .replace("&apos;", "'")
        )
        chars.update(text)
    return "".join(sorted(chars))


def subset_font(ttf_bytes: bytes, charset: str) -> bytes:
    """Subset a TTF font to only include characters in charset, return woff2."""
    font = TTFont(io.BytesIO(ttf_bytes))
    opts = Options()
    opts.layout_features = ["*"]  # keep all OpenType features
    opts.notdef_outline = True
    opts.recalc_bounds = True
    opts.drop_tables = ["DSIG"]
    subsetter = Subsetter(options=opts)
    subsetter.populate(text=charset)
    subsetter.subset(font)
    font.flavor = "woff2"  # output as woff2 (requires brotli)
    out = io.BytesIO()
    font.save(out)
    return out.getvalue()


def process_svg(path: Path) -> bool:
    """Subset the embedded font in one SVG file. Returns True if modified."""
    content = path.read_text(encoding="utf-8")

    m = FONT_RE.search(content)
    if not m:
        print(f"  SKIP {path.name}: no embedded font found")
        return False

    mime, b64_payload, fmt = m.group(1), m.group(2), m.group(3)

    # Decode current font
    try:
        ttf_bytes = base64.b64decode(b64_payload)
    except Exception as e:
        print(f"  SKIP {path.name}: base64 decode error: {e}")
        return False

    original_size = len(ttf_bytes)

    # Extract characters used in this SVG
    charset = extract_chars(content)
    if not charset:
        print(f"  SKIP {path.name}: no <text> elements found")
        return False

    # Subset
    try:
        woff2_bytes = subset_font(ttf_bytes, charset)
    except Exception as e:
        print(f"  SKIP {path.name}: subset error: {e}")
        return False

    new_b64 = base64.b64encode(woff2_bytes).decode("ascii")

    # Replace the font payload and update mime/format
    new_m = FONT_RE.search(content)
    old_block = new_m.group(0)
    new_block = f"url(data:font/woff2;base64,{new_b64}) format(\"woff2\")"
    content = content.replace(old_block, new_block, 1)

    path.write_text(content, encoding="utf-8")

    new_size = path.stat().st_size
    print(
        f"  OK   {path.name}: "
        f"font {original_size:,} B -> {len(woff2_bytes):,} B | "
        f"SVG {path.stat().st_size:,} B ({len(charset)} glyphs)"
    )
    return True


def main():
    svg_files = sorted(DIAGRAMS.glob("*.svg"))
    fat = [f for f in svg_files if f.stat().st_size > THRESHOLD]
    if not fat:
        print(f"No SVGs over {THRESHOLD // 1024} KB found.")
        return

    print(f"Found {len(fat)} SVG(s) over {THRESHOLD // 1024} KB:\n")
    modified = 0
    for f in fat:
        if process_svg(f):
            modified += 1

    print(f"\nDone: {modified}/{len(fat)} files subset.")


if __name__ == "__main__":
    main()
