import { EismaElement } from '../base';
import { SHADOW_RING } from "../shadows";

const BASE =
  'inline-flex items-center rounded-full border px-2.5 py-0.5 ' +
  'text-xs font-semibold transition-colors ' +
  'focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 ' +
  'dark:focus:ring-neutral-300';

const VARIANTS: Record<string, string> = {
  default:
    'border-transparent bg-neutral-900 text-neutral-50 hover:bg-neutral-900/80 ' +
    'dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/80',
  secondary:
    'border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 ' +
    'dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
  destructive:
    'border-transparent bg-red-600 text-neutral-50 hover:bg-red-600/80 ' +
    'dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/80',
  outline:
    'text-neutral-950 border-transparent ' + SHADOW_RING + ' ' +
    'dark:text-neutral-50',
};

const CONSUMED = ['class', 'variant'];

export class EismaBadge extends EismaElement {
  protected mount(): void {
    const variant = this.getAttribute('variant') || 'default';
    const variantClass = VARIANTS[variant] ?? VARIANTS.default;
    const cls = this.mergeClass(`${BASE} ${variantClass}`);

    const span = document.createElement('span');
    span.className = cls;

    this.passThroughAttributes(span, CONSUMED);
    this.moveChildren(span);

    CONSUMED.forEach((a) => this.removeAttribute(a));

    this.appendChild(span);
  }
}
