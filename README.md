# Eisma UI Kit

Framework-agnostic Web Components for any HTML page. Built on
[Alpine.js](https://alpinejs.dev) for reactivity and styled with
[Tailwind v4](https://tailwindcss.com) utilities.

Components ship as native custom elements (`<eisma-button>`, `<eisma-modal>`, …)
that render into light DOM, so Tailwind classes and Alpine directives compose
exactly the way you'd expect.

## Install

**Via npm (GitHub Packages):**

```bash
npm install github:eismamediagroep/ui-kit#main
```

**Via CDN (no install):**

```html
<script src="https://cdn.jsdelivr.net/gh/eismamediagroep/ui-kit@main/dist/eisma.iife.js" defer></script>
```

When stable version is available, use it via for example `@v0.1.0` or use `@main` while iterating.

## Usage

The library expects you to provide Alpine and Tailwind yourself.

```html
<!doctype html>
<html>
  <head>
    <!-- Your Tailwind output -->
    <link rel="stylesheet" href="/css/app.css" />

    <!-- Alpine v3 -->
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <!-- Eisma UI Kit (IIFE registers the custom elements) -->
    <script defer src="https://cdn.jsdelivr.net/gh/eismamediagroep/ui-kit@main/dist/eisma.iife.js"></script>
  </head>
  <body>
    <eisma-button modal="welcome" toggle>Open modal</eisma-button>

    <eisma-modal id="welcome">
      <h2 class="text-lg font-semibold">Hello</h2>
      <p>Modal content.</p>
      <eisma-button modal="welcome" close>Close</eisma-button>
    </eisma-modal>
  </body>
</html>
```

### Tailwind v4 setup

```css
@import "tailwindcss";
@source "../node_modules/@eismamediagroep/ui-kit/dist/**/*.js";
```

## Development

```bash
npm install
npm run dev     # Vite dev server, live reloading of docs
npm run build   # Build dist/
```
