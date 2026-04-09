# Manglar Landing Page

## Project Overview

Landing page de marketing para **Manglar**, un servicio B2B que opera tiendas e-commerce (Shein y TikTok Shop) en nombre de clientes. El sitio está en español y tiene un diseño oscuro y premium con múltiples puntos de conversión vía WhatsApp.

## Tech Stack

- **Astro 6.0.8** — framework de sitio estático
- **Tailwind CSS 4.2.2** — estilos utilitarios (vía plugin de Vite)
- **TypeScript** — modo estricto
- **Node.js 22.12.0+**

## Commands

```bash
npm run dev      # servidor de desarrollo en localhost:4321
npm run build    # build de producción a ./dist/
npm run preview  # previsualizar el build de producción
```

## Project Structure

```
src/
├── pages/index.astro     # página principal completa (~715 líneas)
├── layouts/Layout.astro  # documento HTML base con fuentes y metadata
└── styles/global.css     # Tailwind + colores de marca y clases custom

public/                   # assets estáticos (favicons)
dist/                     # output de build (no editar)
```

## Design System

**Colores de marca:**
- Primario: `#ff8c95` (rosa) y `#e80048` (rojo) — usados en gradientes
- Fondo: `#0e0e0e` (principal), `#1a1a1a` / `#161616` (cards)
- Texto: blanco con capas de opacidad (100%, 72%, 62%, 52%, 38%)
- WhatsApp: `#25D366` / `#128C7E`

**Tipografía (Google Fonts):**
- Titulares: Plus Jakarta Sans (600–900)
- Cuerpo: Manrope (400–700)
- Íconos: Material Symbols Outlined

**Breakpoints:**
- Desktop: layouts multi-columna, nav fijo (91px)
- Tablet 768px: 2 columnas, nav (79px)
- Mobile 480px: columna única

## Page Sections

1. Barra de navegación fija
2. Hero con propuesta de valor
3. Servicios (5 cards)
4. Sección de problemas/dolores
5. Galería visual
6. Features de IA (tablas comparativas)
7. Proceso en 5 pasos
8. FAQ (acordeón expandible)
9. CTA con gradiente
10. Footer
11. Botón flotante de WhatsApp

## Key Notes

- Todo el contenido está en **un solo archivo**: `src/pages/index.astro`
- El sitio es completamente estático — sin backend ni CMS
- El canal de conversión principal es **WhatsApp**
- HTML declarado en `lang="es"`
