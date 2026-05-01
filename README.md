# Manglar Landing

Landing estática de Manglar construida con Astro.

## Comandos

```sh
npm install
npm run dev
npm run build
npm run preview
```

## SEO e indexación

La landing ya genera los archivos principales para indexación:

- `dist/index.html`
- `dist/robots.txt`
- `dist/sitemap-index.xml`
- `dist/sitemap-0.xml`

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
