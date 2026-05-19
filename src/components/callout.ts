import { EismaElement } from '../base';
import { SHADOW_RING } from "../shadows";

const BASE =
  'relative w-full rounded-lg p-4 ' +
  '[&>svg+div]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4';

// Default uses the layered SHADOW_RING (inset highlight + ring + drop).
// Tinted variants keep an explicit colored border since their backgrounds are
// already tinted and the neutral ring tint wouldn't match.
const VARIANTS: Record<string, string> = {
  default:
    'bg-white text-neutral-950 ' + SHADOW_RING + ' [&>svg]:text-neutral-950 ' +
    'dark:bg-neutral-950 dark:text-neutral-50 dark:[&>svg]:text-neutral-50',
  info:
    'bg-blue-50 text-blue-900 border border-blue-200 [&>svg]:text-blue-600 ' +
    'dark:bg-blue-950/40 dark:text-blue-100 dark:border-blue-900 dark:[&>svg]:text-blue-400',
  warning:
    'bg-amber-50 text-amber-900 border border-amber-200 [&>svg]:text-amber-600 ' +
    'dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-900 dark:[&>svg]:text-amber-400',
  destructive:
    'bg-red-50 text-red-900 border border-red-200 [&>svg]:text-red-600 ' +
    'dark:bg-red-950/40 dark:text-red-100 dark:border-red-900 dark:[&>svg]:text-red-400',
};

const TITLE_CLASS = 'mb-1 font-medium leading-none tracking-tight';
const BODY_CLASS = 'text-sm [&_p]:leading-relaxed';

const CONSUMED = ['class', 'variant', 'title'];

export class EismaCallout extends EismaElement {
  protected mount(): void {
    const variant = this.getAttribute('variant') || 'default';
    const title = this.getAttribute('title');
    const variantClass = VARIANTS[variant] ?? VARIANTS.default;
    const cls = this.mergeClass(`${BASE} ${variantClass}`);

    const children = Array.from(this.childNodes);

    const root = document.createElement('div');
    root.setAttribute('role', 'alert');
    root.className = cls;

    this.passThroughAttributes(root, CONSUMED);

    // Pull out any leading <svg> or <eisma-icon> so it can be absolutely positioned.
    let leadingIcon: Node | null = null;
    const first = children.find((n) => n.nodeType === Node.ELEMENT_NODE) as Element | undefined;
    if (first && (first.tagName === 'SVG' || first.tagName === 'EISMA-ICON')) {
      leadingIcon = first;
      children.splice(children.indexOf(first), 1);
    }

    if (leadingIcon) root.appendChild(leadingIcon);

    if (title) {
      const h5 = document.createElement('h5');
      h5.className = TITLE_CLASS;
      h5.textContent = title;
      root.appendChild(h5);
    }

    const body = document.createElement('div');
    body.className = BODY_CLASS;
    children.forEach((c) => body.appendChild(c));
    root.appendChild(body);

    CONSUMED.forEach((a) => this.removeAttribute(a));

    this.style.display = 'block';
    this.appendChild(root);
  }
}
