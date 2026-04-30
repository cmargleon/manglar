from playwright.sync_api import sync_playwright
import time

BASE_URL = "http://localhost:4321"
OUT_DIR = "/Users/claudiomatias/Documents/projects/tuto/web/landing/manglar/screenshots"

def find_and_capture(url, path, width, height, js_find_expr, label=""):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": width, "height": height})
        page.goto(url, wait_until="networkidle")
        top = page.evaluate(js_find_expr)
        print(f"  {label} top={top}")
        if top:
            page.evaluate(f"window.scrollTo(0, {int(top) - 20})")
            time.sleep(0.5)
        page.screenshot(path=path, full_page=False)
        browser.close()

# Find the faq-item elements
faq_js = """
    () => {
        const el = document.querySelector('.faq-item');
        if (!el) return null;
        return window.scrollY + el.getBoundingClientRect().top;
    }
"""

# Mobile FAQ accordion items
find_and_capture(BASE_URL, f"{OUT_DIR}/mobile_faq_items.png", 390, 844, faq_js, "mobile faq items")

# Tablet FAQ accordion items
find_and_capture(BASE_URL, f"{OUT_DIR}/tablet_faq_items.png", 768, 1024, faq_js, "tablet faq items")

# Also check the process section
process_js = """
    () => {
        const headings = Array.from(document.querySelectorAll('h2'));
        const el = headings.find(h => h.textContent.includes('proceso') || h.textContent.includes('Proceso') || h.textContent.includes('pasos') || h.textContent.includes('Pasos') || h.textContent.includes('Empezamos'));
        if (!el) {
            // fallback: look for steps-section
            const sec = document.querySelector('.steps-section, .steps-grid');
            if (!sec) return null;
            return window.scrollY + sec.getBoundingClientRect().top;
        }
        return window.scrollY + el.getBoundingClientRect().top;
    }
"""

find_and_capture(BASE_URL, f"{OUT_DIR}/mobile_process.png", 390, 844, process_js, "mobile process")
find_and_capture(BASE_URL, f"{OUT_DIR}/tablet_process.png", 768, 1024, process_js, "tablet process")

print("Done.")
