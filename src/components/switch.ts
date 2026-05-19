import { EismaElement } from '../base';

const LABEL_CLASS =
  'relative inline-flex items-center gap-3 ' +
  'text-sm font-medium leading-none ' +
  'text-neutral-950 dark:text-neutral-50 ' +
  'cursor-pointer has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-70';

const TRACK_CLASS =
  'inline-block h-5 w-9 shrink-0 rounded-full transition-colors ' +
  'bg-neutral-200 peer-checked:bg-neutral-900 ' +
  'dark:bg-neutral-800 dark:peer-checked:bg-neutral-50 ' +
  'peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-950 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white ' +
  'dark:peer-focus-visible:ring-neutral-300 dark:peer-focus-visible:ring-offset-neutral-950';

const THUMB_CLASS =
  'pointer-events-none absolute h-4 w-4 rounded-full shadow transition-transform ' +
  'left-0.5 top-1/2 -translate-y-1/2 ' +
  'peer-checked:translate-x-4 ' +
  'bg-white dark:bg-neutral-950';

const INPUT_ATTRS = new Set([
  'name', 'value', 'checked', 'disabled', 'required', 'form',
  'id', 'aria-describedby', 'aria-label', 'aria-labelledby',
]);

export class EismaSwitch extends EismaElement {
  protected mount(): void {
    const labelClass = this.mergeClass(LABEL_CLASS);

    const label = document.createElement('label');
    label.className = labelClass;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.setAttribute('role', 'switch');
    input.className = 'peer sr-only';

    for (const attr of Array.from(this.attributes)) {
      if (INPUT_ATTRS.has(attr.name) || attr.name.startsWith('data-')) {
        input.setAttribute(attr.name, attr.value);
        this.removeAttribute(attr.name);
      }
    }

    const track = document.createElement('span');
    track.className = TRACK_CLASS;

    const thumb = document.createElement('span');
    thumb.className = THUMB_CLASS;

    label.appendChild(input);
    label.appendChild(track);
    label.appendChild(thumb);

    if (this.childNodes.length) {
      const text = document.createElement('span');
      this.moveChildren(text);
      label.appendChild(text);
    }

    this.appendChild(label);
  }
}
