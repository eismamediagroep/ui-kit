import { EismaElement } from '../base';
import { SHADOW_RING } from "../shadows";

// No `rounded-*` here — radius is size-dependent and applied per SIZE entry.
const BASE =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap ' +
  'text-sm font-medium transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-1 ' +
  'focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300 ' +
  'disabled:pointer-events-none disabled:opacity-50';

// `default` is the dark neutral button (inverts in dark mode).
// `primary` / `secondary` pull from consumer-defined Tailwind v4 @theme
// tokens — see README for the tokens to define. Brand colors don't invert
// in dark mode.
const VARIANTS: Record<string, string> = {
  default:
    'bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 ' +
    'dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90',
  primary:
    'bg-primary text-primary-foreground shadow hover:bg-primary/90',
  secondary:
    'bg-secondary text-secondary-foreground shadow hover:bg-secondary/90',
  outline:
    'bg-white ' + SHADOW_RING + ' hover:bg-neutral-100 hover:text-neutral-900 ' +
    'dark:bg-neutral-950 dark:text-neutral-50 ' +
    'dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
  ghost:
    'hover:bg-neutral-100 hover:text-neutral-900 ' +
    'dark:text-neutral-50 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
  destructive:
    'bg-red-600 text-neutral-50 shadow-sm hover:bg-red-600/90 ' +
    'dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90',
  link:
    'text-primary underline-offset-4 hover:underline',
};

// Size determines radius: default/sm/icon use rounded-md, lg uses rounded-lg.
const SIZES: Record<string, string> = {
  default: 'h-9 rounded-md px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-10 rounded-lg px-8',
  icon: 'h-9 w-9 rounded-md',
};

const CONSUMED = [
  'class', 'modal', 'open', 'close', 'toggle', 'variant', 'size',
  'icon-left', 'icon-right', 'icon-library',
];

export class EismaButton extends EismaElement {
  protected mount(): void {
    const modalId = this.getAttribute('modal');
    const action = this.hasAttribute('open')
      ? 'open'
      : this.hasAttribute('close')
        ? 'close'
        : 'toggle';

    const variant = this.getAttribute('variant') || 'default';
    const size = this.getAttribute('size') || 'default';
    const iconLeft = this.getAttribute('icon-left');
    const iconRight = this.getAttribute('icon-right');
    const iconLibrary = this.getAttribute('icon-library') || 'lucide';
    const variantClass = VARIANTS[variant] ?? VARIANTS.default;
    const sizeClass = SIZES[size] ?? SIZES.default;

    const btnClass = this.mergeClass(`${BASE} ${variantClass} ${sizeClass}`);

    // Render as <a> when href is present so the button works as a navigable
    // link with native middle-click / right-click / cmd-click semantics.
    const href = this.getAttribute('href') || this.getAttribute(':href');
    const el = document.createElement(href ? 'a' : 'button');
    el.className = btnClass;

    this.passThroughAttributes(el, CONSUMED);

    if (!href && !el.hasAttribute('type')) {
      el.setAttribute('type', 'button');
    }

    if (modalId) {
      el.setAttribute('x-data', '');
      el.setAttribute(
        'x-on:click',
        `$dispatch('eisma-modal-${action}', { id: ${JSON.stringify(modalId)} })`,
      );
    }

    // Insert icons around the slot content. The button is inline-flex with
    // gap-2 so the icons and text space themselves automatically.
    if (iconLeft) el.appendChild(makeButtonIcon(iconLeft, iconLibrary, size));
    this.moveChildren(el);
    if (iconRight) el.appendChild(makeButtonIcon(iconRight, iconLibrary, size));

    CONSUMED.forEach((a) => this.removeAttribute(a));

    this.appendChild(el);
  }
}

function makeButtonIcon(name: string, library: string, size: string): HTMLElement {
  const icon = document.createElement('eisma-icon');
  icon.setAttribute('name', name);
  // Match the icon size to the button: 16px for default/sm/icon (text-sm,
  // text-xs), 18px for lg to balance the larger button.
  icon.setAttribute('size', size === 'lg' ? '18' : '16');
  if (library !== 'lucide') icon.setAttribute('library', library);
  return icon;
}
