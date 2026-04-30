from playwright.sync_api import sync_playwright
import time

BASE_URL = "http://localhost:4321"
OUT_DIR = "/Users/claudiomatias/Documents/projects/tuto/web/landing/manglar/screenshots"

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

# Mobile: AI section feature grid (the two-column card overflow)
# The ia section starts at y=5651, so scrolling through it
for y_offset, label in [(0, 'top'), (844, 'mid'), (1688, 'bottom')]:
    scroll = 5631 + y_offset
    capture(BASE_URL, f"{OUT_DIR}/mobile_ia_{label}.png", 390, 844, scroll_y=scroll)
    print(f"Saved mobile_ia_{label}.png")

# Mobile: FAQ section
for y_offset, label in [(0, 'top'), (844, 'mid')]:
    scroll = 9792 + y_offset
    capture(BASE_URL, f"{OUT_DIR}/mobile_faq_{label}.png", 390, 844, scroll_y=scroll)
    print(f"Saved mobile_faq_{label}.png")

# Tablet: AI section
for y_offset, label in [(0, 'top'), (1024, 'mid'), (2048, 'bottom')]:
    scroll = 4979 + y_offset
    capture(BASE_URL, f"{OUT_DIR}/tablet_ia_{label}.png", 768, 1024, scroll_y=scroll)
    print(f"Saved tablet_ia_{label}.png")

# Tablet: FAQ
faq_top = 8033
for y_offset, label in [(0, 'top'), (1024, 'mid')]:
    scroll = faq_top - 20 + y_offset
    capture(BASE_URL, f"{OUT_DIR}/tablet_faq_{label}.png", 768, 1024, scroll_y=scroll)
    print(f"Saved tablet_faq_{label}.png")

print("Done.")
