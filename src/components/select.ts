import { EismaElement } from '../base';
import { SHADOW_RING } from "../shadows";

// `appearance-none` removes the OS-native arrow + native form-control
// rendering (which can mask our box-shadow on Safari/Chrome).
// Plain `block` here, not `flex`: `flex` on a <select> doesn't lay out the
// option text and on some browsers measures the box wrong with
// appearance-none, producing a too-tall control.
const DEFAULT_SELECT =
  'block h-9 w-full rounded-md bg-white appearance-none ' +
  'px-3 py-1 pr-9 text-sm ' + SHADOW_RING + ' transition-colors ' +
  'text-neutral-950 ' +
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 ' +
  'disabled:cursor-not-allowed disabled:opacity-50 ' +
  'dark:bg-neutral-950 dark:text-neutral-50 ' +
  'dark:focus-visible:ring-neutral-300';

export class EismaSelect extends EismaElement {
  protected mount(): void {
    const cls = this.mergeClass(DEFAULT_SELECT);

    const select = document.createElement('select');
    select.className = cls;

    this.passThroughAttributes(select, []);
    this.moveChildren(select);

    // Stack select + chevron in a single 1×1 grid cell so we don't need
    // absolute positioning. items-center handles vertical alignment.
    const wrapper = document.createElement('div');
    wrapper.className = 'grid w-full grid-cols-1 grid-rows-1 items-center';

    select.style.gridArea = '1 / 1';
    wrapper.appendChild(select);

    // Chevron positioning must be set via INLINE STYLES, not class.
    // <eisma-icon>'s mount calls mergeClass which moves the class attribute
    // onto the inner <svg> — so layout utilities like `justify-self-end`
    // would land on the SVG, not on the host (the actual grid item),
    // leaving the host at default `justify-self: stretch` (= start-aligned
    // with its fixed 16px width). Color classes can stay in `class` since
    // currentColor inherits through to the SVG.
    const chevron = document.createElement('eisma-icon');
    chevron.setAttribute('name', 'chevron-down');
    chevron.setAttribute('size', '16');
    chevron.setAttribute('class', 'text-neutral-500 dark:text-neutral-400');
    chevron.style.gridArea = '1 / 1';
    chevron.style.alignSelf = 'center';
    chevron.style.justifySelf = 'end';
    chevron.style.marginRight = '0.75rem';
    chevron.style.zIndex = '10';
    chevron.style.pointerEvents = 'none';
    wrapper.appendChild(chevron);

    this.style.display = 'block';
    this.appendChild(wrapper);
  }
}
