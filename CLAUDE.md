# Agencia Manglar — sitio web

## Project Overview

Sitio B2B de **Agencia Manglar**, empresa mexicana que externaliza la operación de catálogos ecommerce
(fotografía comercial, organización de fichas, publicación y mantenimiento) en **SHEIN, Mercado Libre y
TikTok Shop**. **TikTok LIVE** (transmisiones con presentador de Manglar) es el segundo servicio principal y tiene
protagonismo en el home (hero, menú, sección propia). Público: fabricantes, distribuidores, importadores y marcas. El tráfico principal llega desde campañas de
prospección por correo. Sitio en español (`lang="es-MX"`), estático, servido con nginx.

Reglas de contenido:
- No mencionar herramientas internas, proveedores ni arquitectura tecnológica. No posicionar como software/SaaS.
- La IA solo se menciona como apoyo para imágenes, con aviso de revisión y transparencia hacia el cliente.
- Nada de testimonios, métricas, logos de clientes, garantías de ventas ni afiliación con marketplaces.
- El primer mes siempre se enfoca en SHEIN; los demás canales se incorporan desde el mes 2 (no garantizado).
- Excepción: la gestión de **TikTok LIVE** (sección `Live.astro`, contenido en `liveService` de `site.ts`) está disponible desde el inicio del servicio. No se publica precio de LIVE; el alcance se define en el diagnóstico. Manglar pone al presentador.

## Tech Stack

- Astro 6, Tailwind CSS 4 (solo como base/preflight; el diseño vive en `src/styles/global.css`), TypeScript estricto.
- Sin dependencias de UI ni fuentes de íconos: íconos SVG en `src/components/Icon.astro`.

## Commands

```bash
npm run dev      # localhost:4321
npm run build    # ./dist/
npm run preview
```

## Structure

```
src/
├── data/site.ts               # contacto, marketplaces, servicios, planes, FAQs (editar contenido aquí)
├── layouts/Layout.astro       # <head>, SEO, JSON-LD, analítica opcional, header/footer
├── components/
│   ├── Header.astro, Footer.astro, Logo.astro, Icon.astro, SectionHeader.astro
│   └── sections/              # Hero, Marketplaces, Problems, Services, Live, Paths, Process, Gallery, Pricing, Faq, Contact, Benefits, CtaBand
├── pages/
│   ├── index.astro
│   ├── gestion-shein.astro    # landing A (ya venden en SHEIN)
│   ├── vender-en-shein.astro  # landing B (quieren comenzar en SHEIN)
│   └── aviso-de-privacidad.astro  # datos legales pendientes en el objeto `legal`
├── scripts/analytics.ts       # eventos de conversión
└── styles/global.css          # tokens y estilos de todo el sitio
```

## Design System

- Tema oscuro en todo el sitio: fondo `#0e0e10` (paneles `#151518` / `#1c1c21`), texto `#f5f5f6`, filetes blancos translúcidos.
- Acento de marca `#e80048` (hover `#c9003e`), tinte `#ff8c95` para texto de acento (el rojo puro no da contraste suficiente como texto). Usar con moderación.
- Estilo minimal premium: mucho aire, filetes de 1px en lugar de tarjetas rellenas, sin sombras, radios pequeños (2–6px) y botones tipo píldora.
- Tipografía: Plus Jakarta Sans (titulares, peso 500), Manrope (texto). Etiquetas en mayúsculas con tracking amplio.
- Breakpoints: 640px, 768/900px, 960px (nav de escritorio), 1024px.
- Imágenes: si una imagen llega en PNG, convertirla a JPG antes de usarla. Las de la galería van en proporción 3:4 (1200×1600) para que todas midan lo mismo.
- Animaciones: `data-reveal` + `prefers-reduced-motion` respetado.
- Configuración de entorno: ver `.env.example` y README.
