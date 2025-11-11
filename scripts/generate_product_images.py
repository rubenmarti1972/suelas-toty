from __future__ import annotations

import struct
import zlib
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Tuple

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_ORIGINAL = ROOT / "frontend/src/assets/images/products/originals"
OUTPUT_CATALOG = ROOT / "frontend/src/assets/images/products/catalog"

OUTPUT_ORIGINAL.mkdir(parents=True, exist_ok=True)
OUTPUT_CATALOG.mkdir(parents=True, exist_ok=True)

Color = Tuple[int, int, int]

CANVAS_WIDTH = 1080
CANVAS_HEIGHT = 1350
SCALE_SMALL = 2  # factor to downscale for catalog assets

FONT_5X7: Dict[str, List[str]] = {
    "A": [" 1 ", "1 1", "111", "1 1", "1 1"],
    "B": ["11 ", "1 1", "11 ", "1 1", "11 "],
    "C": [" 11", "1  ", "1  ", "1  ", " 11"],
    "D": ["11 ", "1 1", "1 1", "1 1", "11 "],
    "E": ["111", "1  ", "11 ", "1  ", "111"],
    "F": ["111", "1  ", "11 ", "1  ", "1  "],
    "G": [" 11", "1  ", "1  ", "1 1", " 11"],
    "H": ["1 1", "1 1", "111", "1 1", "1 1"],
    "I": ["111", " 1 ", " 1 ", " 1 ", "111"],
    "J": [" 11", "  1", "  1", "1 1", " 1 "],
    "K": ["1 1", "1 1", "11 ", "1 1", "1 1"],
    "L": ["1  ", "1  ", "1  ", "1  ", "111"],
    "M": ["1 1", "111", "101", "1 1", "1 1"],
    "N": ["1 1", "111", "111", "1 1", "1 1"],
    "O": ["111", "1 1", "1 1", "1 1", "111"],
    "P": ["111", "1 1", "111", "1  ", "1  "],
    "Q": ["111", "1 1", "1 1", "111", " 11"],
    "R": ["111", "1 1", "111", "1 1", "1 1"],
    "S": [" 11", "1  ", "111", "  1", "11 "],
    "T": ["111", " 1 ", " 1 ", " 1 ", " 1 "],
    "U": ["1 1", "1 1", "1 1", "1 1", "111"],
    "V": ["1 1", "1 1", "1 1", "1 1", " 1 "],
    "W": ["1 1", "1 1", "101", "111", "1 1"],
    "X": ["1 1", "1 1", " 1 ", "1 1", "1 1"],
    "Y": ["1 1", "1 1", " 1 ", " 1 ", " 1 "],
    "Z": ["111", "  1", " 1 ", "1  ", "111"],
    "0": ["111", "1 1", "1 1", "1 1", "111"],
    "1": [" 1 ", "11 ", " 1 ", " 1 ", "111"],
    "2": ["111", "  1", "111", "1  ", "111"],
    "3": ["111", "  1", " 11", "  1", "111"],
    "4": ["1 1", "1 1", "111", "  1", "  1"],
    "5": ["111", "1  ", "111", "  1", "111"],
    "6": ["111", "1  ", "111", "1 1", "111"],
    "7": ["111", "  1", " 1 ", " 1 ", " 1 "],
    "8": ["111", "1 1", "111", "1 1", "111"],
    "9": ["111", "1 1", "111", "  1", "111"],
    " ": ["   ", "   ", "   ", "   ", "   "],
    "-": ["   ", "   ", "111", "   ", "   "],
}


@dataclass
class ProductCard:
    slug: str
    title: str
    subtitle: str
    tagline: str
    range_text: str
    segment: str
    colors: Tuple[Color, ...]
    background_top: Color
    background_bottom: Color
    accent: Color


def interpolate_color(a: Color, b: Color, t: float) -> Color:
    return tuple(int(a[i] * (1 - t) + b[i] * t) for i in range(3))


def create_canvas(width: int = CANVAS_WIDTH, height: int = CANVAS_HEIGHT, color: Color = (0, 0, 0)) -> List[List[Color]]:
    return [[color for _ in range(width)] for _ in range(height)]


def draw_gradient(canvas: List[List[Color]], top: Color, bottom: Color) -> None:
    height = len(canvas)
    for y in range(height):
        t = y / (height - 1)
        color = interpolate_color(top, bottom, t)
        row = canvas[y]
        for x in range(len(row)):
            row[x] = color


def put_pixel(canvas: List[List[Color]], x: int, y: int, color: Color) -> None:
    if 0 <= y < len(canvas) and 0 <= x < len(canvas[0]):
        canvas[y][x] = color


def draw_rect(canvas: List[List[Color]], x0: int, y0: int, x1: int, y1: int, color: Color) -> None:
    for y in range(y0, y1):
        if 0 <= y < len(canvas):
            row = canvas[y]
            for x in range(x0, x1):
                if 0 <= x < len(row):
                    row[x] = color


def draw_circle(canvas: List[List[Color]], cx: int, cy: int, radius: int, color: Color) -> None:
    r2 = radius * radius
    for y in range(cy - radius, cy + radius + 1):
        if 0 <= y < len(canvas):
            row = canvas[y]
            dy = y - cy
            for x in range(cx - radius, cx + radius + 1):
                if 0 <= x < len(row):
                    dx = x - cx
                    if dx * dx + dy * dy <= r2:
                        row[x] = color


def draw_text(canvas: List[List[Color]], x: int, y: int, text: str, color: Color, scale: int = 6) -> None:
    cursor_x = x
    text = text.upper()
    for ch in text:
        glyph = FONT_5X7.get(ch)
        if glyph is None:
            glyph = FONT_5X7[" "]
        for gy, row in enumerate(glyph):
            for gx, bit in enumerate(row):
                if bit == "1":
                    for sy in range(scale):
                        for sx in range(scale):
                            put_pixel(canvas, cursor_x + gx * scale + sx, y + gy * scale + sy, color)
        cursor_x += (len(glyph[0]) + 1) * scale


def draw_badge(canvas: List[List[Color]], text: str, x: int, y: int, width: int, height: int, bg: Color, fg: Color) -> None:
    draw_rect(canvas, x, y, x + width, y + height, bg)
    padding_x = 16
    padding_y = 12
    draw_text(canvas, x + padding_x, y + padding_y, text, fg, scale=4)


def draw_footer(canvas: List[List[Color]], slug: str, color_bg: Color, color_fg: Color) -> None:
    text = slug.replace("-", " ")
    scale = 6
    glyph_width = (len(FONT_5X7["A"][0]) + 1) * scale
    text_width = glyph_width * len(text)
    padding = 24
    x0 = CANVAS_WIDTH // 2 - text_width // 2 - padding
    y0 = CANVAS_HEIGHT - 160
    draw_rect(canvas, x0, y0, x0 + text_width + padding * 2, y0 + 80, color_bg)
    draw_text(canvas, x0 + padding, y0 + 16, text, color_fg, scale)


def draw_product_visual(canvas: List[List[Color]], accent: Color) -> None:
    width = len(canvas[0])
    height = len(canvas)
    center_x = width // 2
    center_y = height - 360
    radius_x = 320
    radius_y = 140
    for y in range(center_y - radius_y, center_y + radius_y):
        if 0 <= y < height:
            for x in range(center_x - radius_x, center_x + radius_x):
                dx = (x - center_x) / radius_x
                dy = (y - center_y) / radius_y
                if dx * dx + dy * dy <= 1:
                    shade = int(245 - 20 * dy)
                    canvas[y][x] = (min(255, shade), min(255, shade + 5), min(255, shade + 10))
    # accent stripes
    draw_rect(canvas, center_x - 250, center_y - 40, center_x - 80, center_y + 10, accent)
    draw_rect(canvas, center_x + 40, center_y - 20, center_x + 240, center_y + 30, (255, 255, 255))
    draw_circle(canvas, center_x - 40, center_y - 40, 40, (255, 255, 255))


def write_png(path: Path, pixels: List[List[Color]]) -> None:
    height = len(pixels)
    width = len(pixels[0])
    raw = bytearray()
    for row in pixels:
        raw.append(0)
        for r, g, b in row:
            raw.extend([r & 0xFF, g & 0xFF, b & 0xFF])
    compressed = zlib.compress(bytes(raw), level=9)

    def chunk(tag: bytes, data: bytes) -> bytes:
        return struct.pack("!I", len(data)) + tag + data + struct.pack("!I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    with path.open("wb") as f:
        f.write(b"\x89PNG\r\n\x1a\n")
        f.write(chunk(b"IHDR", struct.pack("!IIBBBBB", width, height, 8, 2, 0, 0, 0)))
        f.write(chunk(b"IDAT", compressed))
        f.write(chunk(b"IEND", b""))


def downscale(pixels: List[List[Color]], factor: int) -> List[List[Color]]:
    src_h = len(pixels)
    src_w = len(pixels[0])
    dst_h = src_h // factor
    dst_w = src_w // factor
    result = [[(0, 0, 0) for _ in range(dst_w)] for _ in range(dst_h)]
    for y in range(dst_h):
        for x in range(dst_w):
            total = [0, 0, 0]
            for dy in range(factor):
                for dx in range(factor):
                    r, g, b = pixels[y * factor + dy][x * factor + dx]
                    total[0] += r
                    total[1] += g
                    total[2] += b
            count = factor * factor
            result[y][x] = (total[0] // count, total[1] // count, total[2] // count)
    return result


PRODUCTS = [
    ProductCard(
        slug="st-thomas-34",
        title="Suela Thomas",
        subtitle="Bicolor",
        tagline="Material Expanson X PVC",
        range_text="Numeración Unisex 34 al 42",
        segment="Somos fabricantes",
        colors=((246, 235, 211), (18, 18, 18), (214, 210, 200)),
        background_top=(11, 32, 87),
        background_bottom=(2, 14, 42),
        accent=(0, 160, 190),
    ),
    ProductCard(
        slug="st-lebron-43",
        title="Suela Lebron",
        subtitle="Bicolor",
        tagline="Material Expanson X PVC",
        range_text="Numeración Unisex 34 al 43",
        segment="Somos fabricantes",
        colors=((250, 250, 250), (187, 229, 255), (18, 18, 18)),
        background_top=(16, 58, 135),
        background_bottom=(6, 22, 68),
        accent=(255, 255, 255),
    ),
    ProductCard(
        slug="st-renaw-42",
        title="Suela Renaw",
        subtitle="",
        tagline="Material expanson ultra liviano",
        range_text="Numeración Unisex 34 al 42",
        segment="Somos fabricantes",
        colors=((18, 18, 18), (246, 235, 211), (250, 250, 250)),
        background_top=(18, 58, 120),
        background_bottom=(8, 20, 58),
        accent=(255, 86, 120),
    ),
    ProductCard(
        slug="st-yerry-40",
        title="Suela Yerry",
        subtitle="",
        tagline="Material expanson ultra liviano",
        range_text="Numeración Dama 34 al 40",
        segment="Somos fabricantes",
        colors=((18, 18, 18), (246, 235, 211), (250, 250, 250)),
        background_top=(116, 78, 196),
        background_bottom=(43, 20, 90),
        accent=(255, 160, 210),
    ),
    ProductCard(
        slug="st-omega-42",
        title="Suela Omega",
        subtitle="",
        tagline="Material expanson ultra liviano",
        range_text="Numeración Unisex 33 al 42",
        segment="Somos fabricantes",
        colors=((18, 18, 18), (246, 235, 211), (250, 250, 250)),
        background_top=(12, 74, 151),
        background_bottom=(6, 22, 68),
        accent=(125, 210, 255),
    ),
    ProductCard(
        slug="st-ultron4k-42",
        title="Suela Ultron 4K",
        subtitle="",
        tagline="Material expanson ultra liviano",
        range_text="Numeración Unisex 34 al 42",
        segment="Somos fabricantes",
        colors=((250, 250, 250), (246, 235, 211), (18, 18, 18)),
        background_top=(8, 58, 160),
        background_bottom=(5, 22, 78),
        accent=(255, 255, 255),
    ),
    ProductCard(
        slug="st-balen-40",
        title="Suela Balen",
        subtitle="",
        tagline="Material expanson ultra liviano",
        range_text="Numeración Dama 34 al 40",
        segment="Somos fabricantes",
        colors=((18, 18, 18), (246, 235, 211), (250, 250, 250)),
        background_top=(64, 140, 230),
        background_bottom=(16, 48, 108),
        accent=(255, 190, 220),
    ),
    ProductCard(
        slug="st-axxus-40",
        title="Suela Axxus",
        subtitle="",
        tagline="Material expanson ultra liviano",
        range_text="Numeración Dama 34 al 40",
        segment="Somos fabricantes",
        colors=((18, 18, 18), (246, 235, 211), (250, 250, 250)),
        background_top=(110, 184, 209),
        background_bottom=(24, 66, 112),
        accent=(255, 192, 150),
    ),
    ProductCard(
        slug="st-zoom-42",
        title="Suela Zoom",
        subtitle="",
        tagline="Material expanson ultra liviano",
        range_text="Numeración Unisex 34 al 42",
        segment="Somos fabricantes",
        colors=((18, 18, 18), (250, 250, 250)),
        background_top=(0, 100, 196),
        background_bottom=(12, 32, 84),
        accent=(180, 255, 255),
    ),
    ProductCard(
        slug="st-joss-42",
        title="Suela Joss",
        subtitle="",
        tagline="Material expanson ultra liviano",
        range_text="Numeración Dama 37 al 42",
        segment="Somos fabricantes",
        colors=((18, 18, 18), (246, 235, 211), (250, 250, 250)),
        background_top=(54, 110, 200),
        background_bottom=(12, 36, 90),
        accent=(255, 228, 150),
    ),
]


for product in PRODUCTS:
    canvas = create_canvas()
    draw_gradient(canvas, product.background_top, product.background_bottom)
    draw_badge(canvas, "SUELAS SANTORINI", 80, 80, 440, 120, (255, 255, 255), product.background_top)
    draw_text(canvas, 80, 280, product.title, (255, 255, 255), scale=8)
    if product.subtitle:
        draw_text(canvas, 80, 400, product.subtitle, (206, 226, 255), scale=6)
    draw_text(canvas, 80, 520, product.tagline, (214, 226, 245), scale=5)
    draw_text(canvas, 80, 620, product.range_text, (214, 226, 245), scale=4)
    draw_text(canvas, 80, 700, product.segment, (214, 226, 245), scale=4)

    # color chips
    start_x = 120
    for idx, color in enumerate(product.colors):
        draw_circle(canvas, start_x + idx * 160, 820, 60, color)
        draw_circle(canvas, start_x + idx * 160, 820, 62, (255, 255, 255))
    draw_text(canvas, 80, 880, "COLORES", (214, 226, 245), scale=4)

    draw_product_visual(canvas, product.accent)
    draw_footer(canvas, product.slug, (255, 255, 255), product.background_top)

    original_path = OUTPUT_ORIGINAL / f"{product.slug}.png"
    write_png(original_path, canvas)

    small_canvas = downscale(canvas, SCALE_SMALL)
    optimized_path = OUTPUT_CATALOG / f"{product.slug}.png"
    write_png(optimized_path, small_canvas)

    print(f"Generated {product.slug}")
