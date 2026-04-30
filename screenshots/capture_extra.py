from playwright.sync_api import sync_playwright
import time

BASE_URL = "http://localhost:4321"
OUT_DIR = "/Users/claudiomatias/Documents/projects/tuto/web/landing/manglar/screenshots"

VIEWPORTS = [
    {"name": "mobile", "width": 390, "height": 844},
    {"name": "tablet", "width": 768, "height": 1024},
]

# Extra scroll positions for deeper sections
EXTRA_SECTIONS = [
    (1600,  "services_bottom"),
    (2800,  "problems_section"),
    (3400,  "visual_gallery"),
    (4800,  "ai_section"),
    (6000,  "process_steps"),
    (7200,  "faq_accordion"),
    (8400,  "cta_footer"),
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

# Also check horizontal scroll on mobile
def check_horizontal_scroll(url, width, height):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": width, "height": height})
        page.goto(url, wait_until="networkidle")
        scroll_width = page.evaluate("document.documentElement.scrollWidth")
        client_width = page.evaluate("document.documentElement.clientWidth")
        print(f"  scrollWidth={scroll_width}, clientWidth={client_width}, overflow={scroll_width - client_width}px")
        # Also check at different scroll positions
        overflowing_elements = page.evaluate("""
            () => {
                const elements = Array.from(document.querySelectorAll('*'));
                const overflowing = [];
                elements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.right > window.innerWidth + 2) {
                        overflowing.push({
                            tag: el.tagName,
                            class: el.className.toString().slice(0, 80),
                            right: Math.round(rect.right),
                            width: Math.round(rect.width)
                        });
                    }
                });
                return overflowing.slice(0, 10);
            }
        """)
        if overflowing_elements:
            print(f"  Overflowing elements:")
            for el in overflowing_elements:
                print(f"    <{el['tag']}> class='{el['class']}' right={el['right']}px width={el['width']}px")
        else:
            print(f"  No overflowing elements detected.")
        browser.close()

for vp in VIEWPORTS:
    name = vp["name"]
    w = vp["width"]
    h = vp["height"]

    print(f"\n=== {name.upper()} ({w}x{h}) ===")
    print(f"Checking horizontal scroll...")
    check_horizontal_scroll(BASE_URL, w, h)

    for scroll_y, label in EXTRA_SECTIONS:
        path = f"{OUT_DIR}/{name}_{label}.png"
        print(f"Capturing {name} @ y={scroll_y} ({label})...")
        capture(BASE_URL, path, w, h, scroll_y=scroll_y)
        print(f"  Saved: {path}")

print("\nDone.")
