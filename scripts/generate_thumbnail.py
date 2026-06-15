#!/usr/bin/env python3
"""Generate a blog thumbnail for the sports sponsorship renewals post."""

from PIL import Image, ImageDraw, ImageFont
import math

W, H = 1200, 630
BG = (15, 22, 35)           # #0f1623
ORANGE = (255, 107, 61)     # #ff6b3d
WHITE = (255, 255, 255)
MUTED = (255, 255, 255, 128)
CARD_BG = (255, 255, 255, 13)   # rgba white ~5%
GRID = (255, 255, 255, 8)

# ── Fonts ─────────────────────────────────────────────────────────────────────
SFNS = "/System/Library/Fonts/SFNS.ttf"
HELVETICA = "/System/Library/Fonts/Helvetica.ttc"
ARIAL_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

def load(path, size, index=0):
    try:
        return ImageFont.truetype(path, size, index=index)
    except Exception:
        return ImageFont.load_default()

font_tag      = load(ARIAL_BOLD, 11)
font_title_lg = load(ARIAL_BOLD, 52)
font_sub      = load(SFNS, 18)
font_brand    = load(SFNS, 13)
font_label    = load(ARIAL_BOLD, 11)
font_source   = load(SFNS, 14)
font_stat_num = load(ARIAL_BOLD, 44)
font_stat_desc= load(SFNS, 13)
font_card_hdr = load(ARIAL_BOLD, 11)

# ── Canvas ─────────────────────────────────────────────────────────────────────
img = Image.new("RGB", (W, H), BG)
d   = ImageDraw.Draw(img, "RGBA")

# Grid
for x in range(0, W, 48):
    d.line([(x, 0), (x, H)], fill=(*BG[:2], 255, 8) if False else (255, 255, 255, 8), width=1)
for y in range(0, H, 48):
    d.line([(0, y), (W, y)], fill=(255, 255, 255, 8), width=1)

# Left glow
for r in range(300, 0, -10):
    alpha = int(55 * (1 - r/300) * (1 - r/300))
    cx, cy = -60, H // 2
    d.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(*ORANGE, alpha))

# Right glow
for r in range(240, 0, -10):
    alpha = int(30 * (1 - r/240) * (1 - r/240))
    cx, cy = W + 30, int(H * 0.25)
    d.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(99, 140, 255, alpha))

# ── Left column ────────────────────────────────────────────────────────────────
LX = 80   # left margin
TY = 148  # top start (vertically centers ~328px of left content in 630px)

# Tag pill
d.ellipse([LX, TY+1, LX+6, TY+7], fill=ORANGE)
tag_text = "SPORTS PARTNERSHIPS  ·  REVENUE INTELLIGENCE"
d.text((LX + 14, TY), tag_text, font=font_tag, fill=ORANGE)

# Title — "Why Most Sponsorship" line 1
# "Renewals Are Built" line 2
# "on Guesswork" line 3 with "Guesswork" in orange
title_y = TY + 36
lines = [
    ("Why Most Sponsorship", WHITE),
    ("Renewals Are Built", WHITE),
    (None, None),   # split line: "on " white + "Guesswork" orange
]
line_h = 62

d.text((LX, title_y),            "Why Most Sponsorship", font=font_title_lg, fill=WHITE)
d.text((LX, title_y + line_h),   "Renewals Are Built",   font=font_title_lg, fill=WHITE)

# Third line: "on " + "Guesswork" in orange
y3 = title_y + line_h * 2
prefix = "on "
d.text((LX, y3), prefix, font=font_title_lg, fill=WHITE)
prefix_w = d.textlength(prefix, font=font_title_lg)
d.text((LX + prefix_w, y3), "Guesswork", font=font_title_lg, fill=ORANGE)

# Subtitle
sub_y = y3 + line_h + 18
sub_text = "Your data lives in six systems. Nobody owns the synthesis.\nHere's what the best partnership teams do differently."
d.text((LX, sub_y), sub_text, font=font_sub, fill=(255, 255, 255, 128))

# Brand
brand_y = sub_y + 72
d.text((LX, brand_y), "breadcrumb.ai", font=font_brand, fill=(255, 255, 255, 77))

# ── Right column ──────────────────────────────────────────────────────────────
RX = 790   # right column start
RW = 330   # card width

# ── Data silos card ───────────────────────────────────────────────────────────
card1_y = 106   # vertically centers right column (418px) in 630px
card1_h = 272
radius = 12

def rounded_rect(draw, xy, r, fill):
    x1, y1, x2, y2 = xy
    draw.rectangle([x1+r, y1, x2-r, y2], fill=fill)
    draw.rectangle([x1, y1+r, x2, y2-r], fill=fill)
    draw.ellipse([x1, y1, x1+2*r, y1+2*r], fill=fill)
    draw.ellipse([x2-2*r, y1, x2, y1+2*r], fill=fill)
    draw.ellipse([x1, y2-2*r, x1+2*r, y2], fill=fill)
    draw.ellipse([x2-2*r, y2-2*r, x2, y2], fill=fill)

# Card 1 background
rounded_rect(d, [RX, card1_y, RX+RW, card1_y+card1_h], radius, (255, 255, 255, 13))
# Card 1 border
d.rectangle([RX, card1_y, RX+RW, card1_y+card1_h], outline=(255, 255, 255, 20), width=1)

# Card 1 header
d.text((RX+20, card1_y+16), "PARTNERSHIP DATA SILOS", font=font_card_hdr, fill=(255, 255, 255, 90))

# Data rows
sources = [
    ("CRM",        (239, 68,  68),  0.40),
    ("Broadcast",  (239, 68,  68),  0.65),
    ("Social",     (245, 158, 11),  0.55),
    ("Ticketing",  (239, 68,  68),  0.30),
    ("In-venue",   (239, 68,  68),  0.20),
]
row_y = card1_y + 50
for label, dot_color, fill_pct in sources:
    # dot
    d.ellipse([RX+20, row_y+4, RX+28, row_y+12], fill=dot_color)
    # label
    d.text((RX+36, row_y), label, font=font_source, fill=(255, 255, 255, 153))
    # bar background
    bar_x = RX + 120
    bar_w = RW - 140
    d.rectangle([bar_x, row_y+6, bar_x+bar_w, row_y+10], fill=(255, 255, 255, 20))
    # bar fill
    d.rectangle([bar_x, row_y+6, bar_x+int(bar_w*fill_pct), row_y+10],
                fill=(*ORANGE, 128))
    row_y += 40

# ── Stat card ─────────────────────────────────────────────────────────────────
card2_y = card1_y + card1_h + 16
card2_h = 130
rounded_rect(d, [RX, card2_y, RX+RW, card2_y+card2_h], radius, (255, 107, 61, 26))
d.rectangle([RX, card2_y, RX+RW, card2_y+card2_h], outline=(255, 107, 61, 51), width=1)

d.text((RX+20, card2_y+22), "23%", font=font_stat_num, fill=ORANGE)
stat_desc = "of sponsorship revenue\nlost to poor fulfillment\ntracking"
d.text((RX+112, card2_y+28), stat_desc, font=font_stat_desc, fill=(255, 255, 255, 128))

# ── Save ─────────────────────────────────────────────────────────────────────
out = "/Volumes/sourcecode/projects-backup/Blog/public/images/drafts/sports-sponsorship-roi-analytics.png"
img.save(out, "PNG")
print(f"Saved to {out}")
