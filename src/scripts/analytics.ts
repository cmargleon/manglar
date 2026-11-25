// Medición de conversiones sin datos personales.
// - Envía eventos a dataLayer (GTM), gtag (GA4) y plausible si existen en la página.

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: EventParams }) => void;
    manglarTrack?: typeof track;
  }
}

export function track(event: string, params: EventParams = {}) {
  const payload = { ...params, page_path: window.location.pathname };
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
    window.gtag?.('event', event, payload);
    window.plausible?.(event, { props: payload });
  } catch {
    /* la analítica nunca debe romper la página */
  }
}

export function initAnalytics() {
  window.manglarTrack = track;

  const pageEvent = document.body.dataset.pageEvent;
  if (pageEvent) track(pageEvent);

  document.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('a, button');
    if (!target) return;

    const explicit = target.dataset.track;
    const href = target.getAttribute('href') || '';
    const label = target.dataset.trackLabel;

    if (explicit) {
      track(explicit, label ? { label } : {});
    } else if (href.startsWith('https://wa.me/')) {
      track('whatsapp_click', label ? { label } : {});
    } else if (href.startsWith('mailto:')) {
      track('email_click', label ? { label } : {});
    }
  });
}
