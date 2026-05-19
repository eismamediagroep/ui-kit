import { EismaElement } from '../base';

const CONTENT_CLASS =
  'absolute z-50 pointer-events-none ' +
  'rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shadow-md ' +
  'bg-neutral-900 text-neutral-50 ' +
  'dark:bg-neutral-50 dark:text-neutral-900';

// Translate-based centering: the tooltip is centered on its own width/height
// rather than the trigger's. The auto-margin approach (inset-x-0 + mx-auto)
// only centers when the tooltip is narrower than the trigger; for tooltips
// wider than their trigger it left-aligns instead.
const SIDE_CLASSES: Record<string, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

let tooltipCounter = 0;

export class EismaTooltip extends EismaElement {
  protected mount(): void {
    const text = this.getAttribute('text') || '';
    const side = this.getAttribute('side') || 'top';
    const trigger = this.getAttribute('trigger') || 'hover';
    const sideClass = SIDE_CLASSES[side] ?? SIDE_CLASSES.top;
    const customClass = this.mergeClass('');

    if (!text) {
      console.warn('<eisma-tooltip> requires a `text` attribute.');
    }

    const ariaId = `eisma-tooltip-${++tooltipCounter}`;
    const consumerId = this.id || '';
    const idLit = JSON.stringify(consumerId);
    const textLit = JSON.stringify(text);

    const children = Array.from(this.childNodes);
    const firstEl = children.find(
      (n) => n.nodeType === Node.ELEMENT_NODE,
    ) as Element | undefined;
    if (firstEl) firstEl.setAttribute('aria-describedby', ariaId);

    while (this.firstChild) this.removeChild(this.firstChild);

    const wrap = document.createElement('span');
    // Both `text` and `isOpen` live in the local x-data scope so the bubble
    // (x-text="text") can react to programmatic updates from the show/flash
    // events. `original` preserves the declared text so flash can revert.
    wrap.setAttribute(
      'x-data',
      `{ isOpen: false, text: ${textLit}, original: ${textLit} }`,
    );
    wrap.className = 'relative inline-block';

    if (trigger === 'click') {
      wrap.setAttribute('x-on:click', 'isOpen = !isOpen');
      wrap.setAttribute('x-on:click.outside', 'isOpen = false');
      wrap.setAttribute('x-on:keydown.escape.window', 'isOpen = false');
    } else if (trigger !== 'manual') {
      // hover (default): mouse + keyboard focus
      wrap.setAttribute('x-on:mouseenter', 'isOpen = true');
      wrap.setAttribute('x-on:mouseleave', 'isOpen = false');
      wrap.setAttribute('x-on:focusin', 'isOpen = true');
      wrap.setAttribute('x-on:focusout', 'isOpen = false');
    }
    // trigger="manual" → no automatic handlers; controlled via events only.

    // Event-based programmatic control. Wired when the consumer set an `id`
    // so multiple tooltips on a page can be targeted independently.
    //
    //   $dispatch('eisma-tooltip-show',   { id, text? })
    //   $dispatch('eisma-tooltip-hide',   { id })
    //   $dispatch('eisma-tooltip-toggle', { id, text? })
    //   $dispatch('eisma-tooltip-flash',  { id, text, duration? })  // 1500ms default
    if (consumerId) {
      wrap.setAttribute(
        'x-on:eisma-tooltip-show.window',
        `if ($event.detail.id === ${idLit}) {
          if ($event.detail.text) text = $event.detail.text;
          isOpen = true;
        }`,
      );
      wrap.setAttribute(
        'x-on:eisma-tooltip-hide.window',
        `if ($event.detail.id === ${idLit}) isOpen = false`,
      );
      wrap.setAttribute(
        'x-on:eisma-tooltip-toggle.window',
        `if ($event.detail.id === ${idLit}) {
          if ($event.detail.text) text = $event.detail.text;
          isOpen = !isOpen;
        }`,
      );
      // Flash: show a temporary message then revert to `original` and hide.
      // Cancels any in-flight flash for the same id.
      wrap.setAttribute(
        'x-on:eisma-tooltip-flash.window',
        `if ($event.detail.id === ${idLit}) {
          if ($event.detail.text) text = $event.detail.text;
          isOpen = true;
          if ($el._tipFlash) clearTimeout($el._tipFlash);
          $el._tipFlash = setTimeout(() => {
            isOpen = false;
            text = original;
          }, $event.detail.duration || 1500);
        }`,
      );
    }

    children.forEach((c) => wrap.appendChild(c));

    const tooltip = document.createElement('div');
    tooltip.id = ariaId;
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('x-show', 'isOpen');
    tooltip.setAttribute('x-text', 'text');
    tooltip.setAttribute('x-cloak', '');
    tooltip.setAttribute('style', 'display: none');
    tooltip.className = [CONTENT_CLASS, sideClass, customClass].filter(Boolean).join(' ');

    wrap.appendChild(tooltip);
    this.appendChild(wrap);
  }
}
