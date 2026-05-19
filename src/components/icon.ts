import { EismaElement } from '../base';

type Library =
  | 'lucide'
  | 'heroicons'
  | 'heroicons-solid'
  | 'heroicons-mini'
  | 'fa-brands'
  | 'fa-solid'
  | 'fa-regular';

const URLS: Record<Library, (name: string) => string> = {
  lucide: (n) => `https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/${n}.svg`,
  heroicons: (n) => `https://cdn.jsdelivr.net/npm/heroicons@latest/24/outline/${n}.svg`,
  'heroicons-solid': (n) => `https://cdn.jsdelivr.net/npm/heroicons@latest/24/solid/${n}.svg`,
  'heroicons-mini': (n) => `https://cdn.jsdelivr.net/npm/heroicons@latest/20/solid/${n}.svg`,
  'fa-brands': (n) => `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/svgs/brands/${n}.svg`,
  'fa-solid': (n) => `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/svgs/solid/${n}.svg`,
  'fa-regular': (n) => `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/svgs/regular/${n}.svg`,
};

const cache = new Map<string, Promise<string>>();

function fetchSvg(url: string): Promise<string> {
  const existing = cache.get(url);
  if (existing) return existing;

  const promise = fetch(url).then((r) => {
    if (!r.ok) throw new Error(`eisma-icon: ${r.status} fetching ${url}`);
    return r.text();
  });
  cache.set(url, promise);
  promise.catch(() => cache.delete(url));
  return promise;
}

const BASE = 'block shrink-0';
const CONSUMED = ['class', 'name', 'library', 'size', 'src'];

export class EismaIcon extends EismaElement {
  protected mount(): void {
    const name = this.getAttribute('name');
    const src = this.getAttribute('src');
    const library = (this.getAttribute('library') || 'lucide') as Library;
    const size = this.getAttribute('size') || '16';
    const cls = this.mergeClass(BASE);

    // Host wraps the SVG as an inline-flex box so it centers cleanly inside
    // flex containers (buttons, dropdown items, callouts). Sizing the host
    // also reserves space before the async SVG arrives, avoiding layout shift.
    const sizePx = /^\d+(\.\d+)?$/.test(size) ? `${size}px` : size;
    this.style.display = 'inline-flex';
    this.style.alignItems = 'center';
    this.style.justifyContent = 'center';
    this.style.width = sizePx;
    this.style.height = sizePx;

    CONSUMED.forEach((a) => this.removeAttribute(a));

    // `src` takes precedence — fetch arbitrary SVG and pass `null` for
    // library so we don't override existing fills (preserves brand colors).
    if (src) {
      fetchSvg(src)
        .then((text) => injectSvg(this, text, size, cls, null))
        .catch((err) => console.warn(err));
      return;
    }

    if (name) {
      const url = (URLS[library] ?? URLS.lucide)(name);
      fetchSvg(url)
        .then((text) => injectSvg(this, text, size, cls, library))
        .catch((err) => console.warn(err));
      return;
    }

    const inline = this.querySelector('svg');
    if (inline) {
      inline.setAttribute('width', size);
      inline.setAttribute('height', size);
      inline.setAttribute('class', cls);
      if (!inline.hasAttribute('aria-hidden')) {
        inline.setAttribute('aria-hidden', 'true');
      }
      return;
    }

    console.warn('<eisma-icon> requires a `name`, `src`, or an inline <svg> child.');
  }
}

function injectSvg(
  host: HTMLElement,
  text: string,
  size: string,
  cls: string,
  library: Library | null,
): void {
  const tmpl = document.createElement('template');
  tmpl.innerHTML = text.trim();
  const svg = tmpl.content.querySelector('svg');
  if (!svg) return;

  svg.querySelectorAll('script').forEach((s) => s.remove());

  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('class', cls);

  // FontAwesome SVGs ship without an explicit `fill="currentColor"`, so they
  // render solid black by default. Setting fill on the root lets the inner
  // paths inherit text color the same way lucide/heroicons do.
  // For `src`-loaded icons (library === null) we leave fill alone so brand
  // colors baked into the SVG are preserved.
  if (library === 'fa-brands' || library === 'fa-solid' || library === 'fa-regular') {
    svg.setAttribute('fill', 'currentColor');
  }

  host.appendChild(svg);
}
