import { EismaElement } from '../base';
import { SHADOW_RING } from '../shadows';

// Asymmetric `pt-0.5 pb-1.5` (2px top / 6px bottom) instead of `py-1` (4/4).
// Native inputs vertically center text using the font's baseline-and-leading
// metrics, which lands ~2px below the box's geometric middle for most
// system fonts. Shifting padding shifts the rendered text up to match.
const DEFAULT_INPUT =
  'flex h-9 w-full rounded-md bg-white ' +
  'px-3 pt-1 pb-1.5 text-sm transition-colors ' +
  SHADOW_RING + ' ' +
  'text-neutral-950 placeholder:text-neutral-500 ' +
  'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 ' +
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 ' +
  'disabled:cursor-not-allowed disabled:opacity-50 ' +
  'dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400 ' +
  'dark:file:text-neutral-50 dark:focus-visible:ring-neutral-300';

const CONSUMED = ['class', 'icon-left', 'icon-right'];

export class EismaInput extends EismaElement {
  protected mount(): void {
    const iconLeft = this.getAttribute('icon-left');
    const iconRight = this.getAttribute('icon-right');

    let inputClass = DEFAULT_INPUT;
    // Icon sits 3px from the input edge; pl-7 / pr-7 leaves ~9px between
    // icon and text (icon ends at 19px from edge, text starts at 28px).
    if (iconLeft) inputClass += ' pl-8';
    if (iconRight) inputClass += ' pr-8';

    const cls = this.mergeClass(inputClass);

    const input = document.createElement('input');
    input.className = cls;

    this.passThroughAttributes(input, CONSUMED);

    if (!input.hasAttribute('type')) input.setAttribute('type', 'text');

    CONSUMED.forEach((a) => this.removeAttribute(a));

    this.style.display = 'block';

    if (!iconLeft && !iconRight) {
      this.appendChild(input);
      return;
    }

    // Stack input + icon(s) in a single 1x1 grid cell. items-center handles
    // vertical centering intrinsically — no absolute positioning, no auto-
    // margin algorithm, no transforms. Parent's `display: grid` is what
    // makes this work.
    const wrapper = document.createElement('div');
    wrapper.className = 'grid w-full grid-cols-1 grid-rows-1 items-center';

    input.style.gridArea = '1 / 1';

    if (iconLeft) wrapper.appendChild(makeIcon(iconLeft, 'left'));
    wrapper.appendChild(input);
    if (iconRight) wrapper.appendChild(makeIcon(iconRight, 'right'));

    this.appendChild(wrapper);
  }
}

function makeIcon(name: string, side: 'left' | 'right'): HTMLElement {
  // Layout properties go on inline styles — class is consumed by
  // <eisma-icon>'s mount (mergeClass moves it onto the inner SVG). Color
  // classes can stay on `class` since currentColor inherits through.
  const icon = document.createElement('eisma-icon');
  icon.setAttribute('name', name);
  icon.setAttribute('size', '16');
  icon.setAttribute('class', 'text-neutral-500 dark:text-neutral-400');
  icon.style.gridArea = '1 / 1';
  icon.style.alignSelf = 'center';
  icon.style.justifySelf = side === 'left' ? 'start' : 'end';
  icon.style[side === 'left' ? 'marginLeft' : 'marginRight'] = '.65rem';
  icon.style.transform = 'translateY(-1px)';
  icon.style.zIndex = '10';
  icon.style.pointerEvents = 'none';
  return icon;
}
