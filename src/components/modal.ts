import { EismaElement } from '../base';
import { SHADOW_OVERLAY } from '../shadows';

const DEFAULT_OVERLAY =
  'fixed inset-0 z-50 flex items-center justify-center p-4';
const DEFAULT_BACKDROP =
  'absolute inset-0 bg-black/80 backdrop-blur-sm';
const DEFAULT_PANEL =
  'relative w-full max-w-lg gap-4 ' +
  'rounded-lg p-6 ' +
  SHADOW_OVERLAY + ' ' +
  'bg-white text-neutral-950 ' +
  'dark:bg-neutral-950 dark:text-neutral-50';

const CONSUMED = [
  'class',
  'backdrop-class',
  'overlay-class',
  'close-on-escape',
  'close-on-backdrop',
  'aria-label',
  'aria-labelledby',
];

export class EismaModal extends EismaElement {
  protected mount(): void {
    const id = this.id;
    if (!id) {
      console.warn('<eisma-modal> requires an `id` attribute so buttons can target it.');
    }

    const panelClass = this.mergeClass(DEFAULT_PANEL);
    const overlayClass = this.getAttribute('overlay-class') || DEFAULT_OVERLAY;
    const backdropClass = this.getAttribute('backdrop-class') || DEFAULT_BACKDROP;
    const closeOnEscape = this.getAttribute('close-on-escape') !== 'false';
    const closeOnBackdrop = this.getAttribute('close-on-backdrop') !== 'false';
    const ariaLabelledBy = this.getAttribute('aria-labelledby');
    const ariaLabel = this.getAttribute('aria-label');

    CONSUMED.forEach((a) => this.removeAttribute(a));

    const idLit = JSON.stringify(id);

    const root = document.createElement('div');
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    if (ariaLabelledBy) root.setAttribute('aria-labelledby', ariaLabelledBy);
    else if (ariaLabel) root.setAttribute('aria-label', ariaLabel);
    root.setAttribute('tabindex', '-1');
    root.setAttribute('x-data', '{ isOpen: false }');
    root.setAttribute('x-show', 'isOpen');
    root.setAttribute('x-cloak', '');
    root.setAttribute('x-transition.opacity', '');
    // x-trap is a no-op unless @alpinejs/focus is loaded; when present it
    // traps focus inside the dialog, makes the rest of the page inert, and
    // prevents body scroll while open.
    root.setAttribute('x-trap.inert.noscroll', 'isOpen');
    root.setAttribute('style', 'display: none');
    root.setAttribute(
      'x-on:eisma-modal-toggle.window',
      `if ($event.detail.id === ${idLit}) isOpen = !isOpen`,
    );
    root.setAttribute(
      'x-on:eisma-modal-open.window',
      `if ($event.detail.id === ${idLit}) isOpen = true`,
    );
    root.setAttribute(
      'x-on:eisma-modal-close.window',
      `if ($event.detail.id === ${idLit}) isOpen = false`,
    );
    if (closeOnEscape) {
      root.setAttribute('x-on:keydown.escape.window', 'isOpen = false');
    }
    root.className = overlayClass;

    const backdrop = document.createElement('div');
    backdrop.className = backdropClass;
    if (closeOnBackdrop) backdrop.setAttribute('x-on:click', 'isOpen = false');

    const panel = document.createElement('div');
    panel.className = panelClass;
    this.moveChildren(panel);

    root.appendChild(backdrop);
    root.appendChild(panel);
    this.appendChild(root);
  }
}
