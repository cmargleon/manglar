# Manglar Landing

Sitio estático de Agencia Manglar (operación de catálogos para SHEIN, Mercado Libre y TikTok Shop) construido con Astro.

## Comandos

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Configuración (variables de entorno de build)

Copia `.env.example` a `.env` y completa los valores antes de `npm run build`:

| Variable | Uso |
|---|---|
| `PUBLIC_GA4_ID` | Opcional. ID de GA4 (`G-…`). Si falta, no se carga Google Analytics. |
| `PUBLIC_PLAUSIBLE_DOMAIN` | Opcional. Dominio en Plausible. |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Opcional. Verificación de Search Console por meta tag. |

Las variables `PUBLIC_*` quedan visibles en el HTML: nunca pongas claves privadas.

## Páginas

- `/` — página principal.
- `/gestion-shein/` — landing para empresas que ya venden en SHEIN.
- `/vender-en-shein/` — landing para empresas que quieren comenzar en SHEIN.
- `/aviso-de-privacidad/` — `noindex` y fuera del sitemap mientras tenga datos legales pendientes (ver `legal` en el archivo).

## Medición

`src/scripts/analytics.ts` envía eventos a `dataLayer`, `gtag` y `plausible` si existen:
`cta_diagnostico_click`, `whatsapp_click`, `email_click`, `plan_click`, `landing_view_gestion_shein`, `landing_view_vender_en_shein`.
Los eventos no incluyen datos personales.

## SEO e indexación

La landing ya genera los archivos principales para indexación:

- `dist/index.html`, `dist/gestion-shein/index.html`, `dist/vender-en-shein/index.html`
- `dist/robots.txt`
- `dist/sitemap-index.xml`
- `dist/sitemap-0.xml`
- `dist/llms.txt` (resumen del sitio para buscadores con IA; actualizarlo si cambian páginas o planes)
- `dist/404.html` (página de error con `noindex`)

Las fuentes se autoalojan con la API de fuentes de Astro (`fonts` en `astro.config.mjs`). El sitemap no incluye `lastmod`, `changefreq` ni `priority`.
Para producción, usar `docs/nginx-canonical-redirect.conf` (301 a `https://agenciamanglar.mx` sin `www` y con `/` final).

La URL canónica de producción es:

```text
https://agenciamanglar.mx/
```

Después de cada deploy público, revisar estas URLs:

```text
https://agenciamanglar.mx/
https://agenciamanglar.mx/robots.txt
https://agenciamanglar.mx/sitemap-index.xml
https://agenciamanglar.mx/sitemap-0.xml
```

## Google Search Console

Pasos recomendados:

1. Crear una propiedad de dominio para `agenciamanglar.mx`.
2. Verificarla con un registro DNS TXT.
3. Enviar el sitemap `https://agenciamanglar.mx/sitemap-index.xml`.
4. Usar "Inspección de URL" para `https://agenciamanglar.mx/` y solicitar indexación.
5. Confirmar que Search Console marque la URL como rastreable e indexable.

Si se prefiere verificar por meta tag HTML, configurar esta variable en el entorno de build:

```sh
PUBLIC_GOOGLE_SITE_VERIFICATION=token-de-google
```

El layout insertará automáticamente:

```html
<meta name="google-site-verification" content="token-de-google">
```

## Redirects requeridos

El hosting debe redirigir todas las variantes a la URL canónica:

```text
http://agenciamanglar.mx/      -> https://agenciamanglar.mx/
http://www.agenciamanglar.mx/  -> https://agenciamanglar.mx/
https://www.agenciamanglar.mx/ -> https://agenciamanglar.mx/
```

No debe existir una versión pública duplicada en un subdominio temporal del hosting.

Hay un ejemplo de configuración nginx en:

```text
docs/nginx-canonical-redirect.conf
```
