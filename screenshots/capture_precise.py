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

def get_section_top(url, width, height, selector):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": width, "height": height})
        page.goto(url, wait_until="networkidle")
        top = page.evaluate(f"""
            () => {{
                const el = document.querySelector('{selector}');
                if (!el) return null;
                const rect = el.getBoundingClientRect();
                return window.scrollY + rect.top;
            }}
        """)
        browser.close()
        return top

# Find exact section tops
sections = ['#servicios', '#visuales', '#ia', '#proceso', '#faq', '#contacto']
print("=== MOBILE (390x844) section tops ===")
for sel in sections:
    top = get_section_top(BASE_URL, 390, 844, sel)
    print(f"  {sel}: y={top}")

print("\n=== TABLET (768x1024) section tops ===")
for sel in sections:
    top = get_section_top(BASE_URL, 768, 1024, sel)
    print(f"  {sel}: y={top}")

# Capture AI section on mobile precisely
print("\nCapturing AI section precisely on mobile...")
top = get_section_top(BASE_URL, 390, 844, '#ia')
if top:
    capture(BASE_URL, f"{OUT_DIR}/mobile_ia_precise.png", 390, 844, scroll_y=int(top) - 20)
    print(f"  Saved mobile_ia_precise.png (scrolled to y={int(top)-20})")

# Capture FAQ section precisely on mobile
print("Capturing FAQ section precisely on mobile...")
top = get_section_top(BASE_URL, 390, 844, '#faq')
if top:
    capture(BASE_URL, f"{OUT_DIR}/mobile_faq_precise.png", 390, 844, scroll_y=int(top) - 20)
    print(f"  Saved mobile_faq_precise.png (scrolled to y={int(top)-20})")

# Capture process steps precisely on mobile
print("Capturing process steps precisely on mobile...")
top = get_section_top(BASE_URL, 390, 844, '#proceso')
if top:
    capture(BASE_URL, f"{OUT_DIR}/mobile_proceso_precise.png", 390, 844, scroll_y=int(top) - 20)
    print(f"  Saved mobile_proceso_precise.png (scrolled to y={int(top)-20})")

# Capture gallery section precisely on mobile
print("Capturing gallery section precisely on mobile...")
top = get_section_top(BASE_URL, 390, 844, '#visuales')
if top:
    capture(BASE_URL, f"{OUT_DIR}/mobile_visuales_precise.png", 390, 844, scroll_y=int(top) - 20)
    print(f"  Saved mobile_visuales_precise.png (scrolled to y={int(top)-20})")

# Tablet: AI section with the two-column grid that's misaligned
print("Capturing AI section precisely on tablet...")
top = get_section_top(BASE_URL, 768, 1024, '#ia')
if top:
    capture(BASE_URL, f"{OUT_DIR}/tablet_ia_precise.png", 768, 1024, scroll_y=int(top) - 20)
    print(f"  Saved tablet_ia_precise.png (scrolled to y={int(top)-20})")

print("\nDone.")
