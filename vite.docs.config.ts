import { defineConfig, type Plugin } from 'vite';
import { resolve } from 'path';

// Dev server config for the docs page.
//
// Strategy: serve docs/index.html from the project root so the page can
// import directly from /src/index.ts. The `swapDistForSource` plugin
// rewrites the <script src="../dist/eisma.iife.js"> tag into a live ES
// module import in dev mode, giving HMR-style behaviour (full page reload
// on src changes) without touching the production HTML.
//
// `npm run build` keeps using vite.config.ts (library build). To produce a
// static docs site for deployment, run `vite build --config vite.docs.config.ts`.

const swapDistForSource: Plugin = {
  name: 'eisma-docs-swap-dist-for-source',
  transformIndexHtml(html, ctx) {
    if (!ctx.server) return html;
    return html.replace(
      /<script[^>]*src="\.\.\/dist\/eisma\.iife\.js"[^>]*><\/script>/,
      '<script type="module" src="/src/index.ts"></script>',
    );
  },
};

export default defineConfig({
  root: resolve(__dirname),
  publicDir: false,
  plugins: [swapDistForSource],
  server: {
    open: '/docs/index.html',
    port: 5173,
  },
  build: {
    // When building docs as a static site, output to docs-dist/.
    outDir: 'docs-dist',
    rollupOptions: {
      input: resolve(__dirname, 'docs/index.html'),
    },
  },
});
