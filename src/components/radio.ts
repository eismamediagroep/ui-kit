import { EismaElement } from '../base';

// No `shadow` here: Chrome renders box-shadow on native <input type="radio">
// as a rectangle around the bounding box, ignoring border-radius, which
// produces a visible square halo behind the round radio.
const CONTROL_CLASS =
  'h-4 w-4 shrink-0 rounded-full border border-neutral-300 ' +
  'text-neutral-900 ' +
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 ' +
  'disabled:cursor-not-allowed disabled:opacity-50 ' +
  'dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 ' +
  'dark:focus-visible:ring-neutral-300';

const LABEL_CLASS =
  'inline-flex items-center gap-2 ' +
  'text-sm font-medium leading-none ' +
  'text-neutral-950 dark:text-neutral-50 ' +
  'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-70';

const INPUT_ATTRS = new Set([
  'name', 'value', 'checked', 'disabled', 'required', 'form',
  'id', 'aria-describedby', 'aria-label', 'aria-labelledby',
]);

export class EismaRadio extends EismaElement {
  protected mount(): void {
    const labelClass = this.mergeClass(LABEL_CLASS);

    const label = document.createElement('label');
    label.className = labelClass;

    const input = document.createElement('input');
    input.type = 'radio';
    input.className = CONTROL_CLASS;

    for (const attr of Array.from(this.attributes)) {
      if (INPUT_ATTRS.has(attr.name) || attr.name.startsWith('data-')) {
        input.setAttribute(attr.name, attr.value);
      }
    }

    label.appendChild(input);

    if (this.childNodes.length) {
      const text = document.createElement('span');
      this.moveChildren(text);
      label.appendChild(text);
    }

    this.appendChild(label);
  }
}
