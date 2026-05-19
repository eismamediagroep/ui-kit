import { EismaElement } from '../base';

const LIST_CLASS =
  'inline-flex h-9 items-center justify-center rounded-lg p-1 ' +
  'bg-neutral-100 text-neutral-500 ' +
  'dark:bg-neutral-800 dark:text-neutral-400';

const TAB_BASE =
  'inline-flex items-center justify-center whitespace-nowrap ' +
  'rounded-md px-3 py-1 text-sm font-medium ' +
  'transition-all cursor-pointer ' +
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 ' +
  'disabled:pointer-events-none disabled:opacity-50 ' +
  'dark:focus-visible:ring-neutral-300';

const TAB_ACTIVE =
  'bg-white text-neutral-950 shadow ' +
  'dark:bg-neutral-950 dark:text-neutral-50';

const PANEL_CLASS = 'mt-2 focus-visible:outline-none';

export class EismaTabs extends EismaElement {
  protected mount(): void {
    const defaultValue = this.getAttribute('default') || '';
    const customClass = this.mergeClass('w-full');

    const root = document.createElement('div');
    root.setAttribute('x-data', `{ active: ${JSON.stringify(defaultValue)} }`);
    root.className = customClass;

    this.moveChildren(root);
    this.removeAttribute('default');

    this.style.display = 'block';
    this.appendChild(root);
  }
}

export class EismaTabList extends EismaElement {
  protected mount(): void {
    const customClass = this.mergeClass(LIST_CLASS);

    const div = document.createElement('div');
    div.setAttribute('role', 'tablist');
    div.className = customClass;

    this.moveChildren(div);
    this.appendChild(div);
  }
}

const TAB_CONSUMED = ['class', 'value'];

export class EismaTab extends EismaElement {
  protected mount(): void {
    const value = this.getAttribute('value') || '';
    const valueLit = JSON.stringify(value);
    const customClass = this.mergeClass(TAB_BASE);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('role', 'tab');
    btn.className = customClass;

    this.passThroughAttributes(btn, TAB_CONSUMED);

    btn.setAttribute('x-on:click', `active = ${valueLit}`);
    btn.setAttribute('x-bind:aria-selected', `active === ${valueLit}`);
    btn.setAttribute(
      'x-bind:class',
      `active === ${valueLit} ? ${JSON.stringify(TAB_ACTIVE)} : ''`,
    );
    btn.setAttribute('x-bind:tabindex', `active === ${valueLit} ? 0 : -1`);

    this.moveChildren(btn);
    TAB_CONSUMED.forEach((a) => this.removeAttribute(a));

    this.appendChild(btn);
  }
}

const PANEL_CONSUMED = ['class', 'value'];

export class EismaTabPanel extends EismaElement {
  protected mount(): void {
    const value = this.getAttribute('value') || '';
    const valueLit = JSON.stringify(value);
    const customClass = this.mergeClass(PANEL_CLASS);

    const div = document.createElement('div');
    div.setAttribute('role', 'tabpanel');
    div.setAttribute('tabindex', '0');
    div.className = customClass;
    div.setAttribute('x-show', `active === ${valueLit}`);
    div.setAttribute('x-cloak', '');
    div.setAttribute('style', 'display: none');

    this.passThroughAttributes(div, PANEL_CONSUMED);
    this.moveChildren(div);
    PANEL_CONSUMED.forEach((a) => this.removeAttribute(a));

    this.style.display = 'block';
    this.appendChild(div);
  }
}
