from playwright.sync_api import sync_playwright
import time

BASE_URL = "http://localhost:4321"
OUT_DIR = "/Users/claudiomatias/Documents/projects/tuto/web/landing/manglar/screenshots"

VIEWPORTS = [
    {"name": "mobile", "width": 390, "height": 844},
    {"name": "tablet", "width": 768, "height": 1024},
]

# Scroll positions to capture specific sections
# (scroll_y, label)
SECTIONS = [
    (0,    "hero"),
    (900,  "after_hero_services"),
    (2200, "gallery"),
    (4200, "faq"),
]

def capture(url, path, width, height, scroll_y=0):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": width, "height": height})
        page.goto(url, wait_until="networkidle")
        if scroll_y > 0:
            page.evaluate(f"window.scrollTo(0, {scroll_y})")
            time.sleep(0.5)
        page.screenshot(path=path, full_page=False)
        browser.close()

def capture_full(url, path, width, height):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": width, "height": height})
        page.goto(url, wait_until="networkidle")
        page.screenshot(path=path, full_page=True)
        browser.close()

for vp in VIEWPORTS:
    name = vp["name"]
    w = vp["width"]
    h = vp["height"]

    # Full page
    full_path = f"{OUT_DIR}/{name}_full_page.png"
    print(f"Capturing full page for {name}...")
    capture_full(BASE_URL, full_path, w, h)
    print(f"  Saved: {full_path}")

    # Section snapshots
    for scroll_y, label in SECTIONS:
        path = f"{OUT_DIR}/{name}_{label}.png"
        print(f"Capturing {name} @ y={scroll_y} ({label})...")
        capture(BASE_URL, path, w, h, scroll_y=scroll_y)
        print(f"  Saved: {path}")

print("Done.")
