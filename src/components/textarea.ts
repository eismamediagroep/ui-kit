import { EismaElement } from '../base';
import { SHADOW_RING } from "../shadows";

const DEFAULT_TEXTAREA =
  'flex min-h-[60px] w-full rounded-md bg-white ' +
  'px-3 py-2 text-sm ' + SHADOW_RING + ' transition-colors ' +
  'text-neutral-950 placeholder:text-neutral-500 ' +
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 ' +
  'disabled:cursor-not-allowed disabled:opacity-50 ' +
  'dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400 ' +
  'dark:focus-visible:ring-neutral-300';

export class EismaTextarea extends EismaElement {
  protected mount(): void {
    const cls = this.mergeClass(DEFAULT_TEXTAREA);

    const initialValue = (this.textContent || '').replace(/^\s+|\s+$/g, '');
    while (this.firstChild) this.removeChild(this.firstChild);

    const ta = document.createElement('textarea');
    ta.className = cls;

    this.passThroughAttributes(ta, []);

    if (initialValue) ta.value = initialValue;

    this.style.display = 'block';
    this.appendChild(ta);
  }
}
