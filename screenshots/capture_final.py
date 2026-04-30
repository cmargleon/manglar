from playwright.sync_api import sync_playwright
import time

BASE_URL = "http://localhost:4321"
OUT_DIR = "/Users/claudiomatias/Documents/projects/tuto/web/landing/manglar/screenshots"

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

# Check logos section on mobile (there are 2 logos getting cut off)
logos_top = get_section_top(BASE_URL, 390, 844, '.logos-row, [class*="logo"], .client-logos')
print(f"Logos section top (mobile): {logos_top}")

# Let's try to find the logos by content
def find_element_top(url, width, height, js_expr):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": width, "height": height})
        page.goto(url, wait_until="networkidle")
        top = page.evaluate(js_expr)
        browser.close()
        return top

# Find the "Empresas que nos eligieron" section
barbie_top = find_element_top(BASE_URL, 390, 844, """
    () => {
        const headings = Array.from(document.querySelectorAll('h2, h3'));
        const el = headings.find(h => h.textContent.includes('Empresas'));
        if (!el) return null;
        return window.scrollY + el.getBoundingClientRect().top;
    }
""")
print(f"'Empresas que nos eligieron' heading top (mobile): {barbie_top}")

if barbie_top:
    capture(BASE_URL, f"{OUT_DIR}/mobile_logos.png", 390, 844, scroll_y=int(barbie_top) - 50)
    print(f"Saved mobile_logos.png")

# Actual FAQ accordion on mobile
faq_top = find_element_top(BASE_URL, 390, 844, """
    () => {
        const el = document.querySelector('.faq-section, #faq');
        if (!el) return null;
        return window.scrollY + el.getBoundingClientRect().top;
    }
""")
print(f"FAQ section top (mobile): {faq_top}")

if faq_top:
    for i, offset in enumerate([0, 844, 1688]):
        capture(BASE_URL, f"{OUT_DIR}/mobile_faq_real_{i}.png", 390, 844, scroll_y=int(faq_top) + offset)
        print(f"Saved mobile_faq_real_{i}.png at y={int(faq_top)+offset}")

# Tablet FAQ
faq_top_tab = find_element_top(BASE_URL, 768, 1024, """
    () => {
        const el = document.querySelector('.faq-section, #faq');
        if (!el) return null;
        return window.scrollY + el.getBoundingClientRect().top;
    }
""")
print(f"FAQ section top (tablet): {faq_top_tab}")

if faq_top_tab:
    for i, offset in enumerate([0, 1024]):
        capture(BASE_URL, f"{OUT_DIR}/tablet_faq_real_{i}.png", 768, 1024, scroll_y=int(faq_top_tab) + offset)
        print(f"Saved tablet_faq_real_{i}.png at y={int(faq_top_tab)+offset}")

print("Done.")
