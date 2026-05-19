import { EismaElement } from '../base';
import { SHADOW_POPOVER } from '../shadows';

const MENU_BASE =
  'absolute z-50 min-w-[8rem] ' +
  'overflow-hidden rounded-md p-1 ' +
  SHADOW_POPOVER + ' ' +
  'bg-white text-neutral-950 ' +
  'dark:bg-neutral-950 dark:text-neutral-50';

const ROOT_CLASS = 'relative inline-block';

const ITEM_BASE =
  'relative flex w-full cursor-pointer select-none items-center gap-2 ' +
  'rounded-sm px-2 py-1.5 text-sm outline-none transition-colors text-left ' +
  'hover:bg-neutral-100 hover:text-neutral-900 ' +
  'focus-visible:bg-neutral-100 focus-visible:text-neutral-900 ' +
  'disabled:pointer-events-none disabled:opacity-50 ' +
  'dark:hover:bg-neutral-800 dark:hover:text-neutral-50 ' +
  'dark:focus-visible:bg-neutral-800 dark:focus-visible:text-neutral-50';

const ITEM_DESTRUCTIVE =
  'text-red-600 hover:text-red-600 focus-visible:text-red-600 ' +
  'hover:bg-red-100 focus-visible:bg-red-100 ' +
  'dark:text-red-400 dark:hover:bg-red-950 dark:focus-visible:bg-red-950';

const SEPARATOR_CLASS = '-mx-1 my-1 h-px bg-neutral-200 dark:bg-neutral-800';
const LABEL_CLASS =
  'px-2 py-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400';

const DROPDOWN_X_DATA = `{
  isOpen: false,
  pos: 'bottom',
  toggle() { if (!this.isOpen) this.measure(); this.isOpen = !this.isOpen; },
  measure() {
    const r = this.$el.getBoundingClientRect();
    const below = window.innerHeight - r.bottom;
    this.pos = (below < 240 && r.top > below) ? 'top' : 'bottom';
  }
}`;

export class EismaDropdown extends EismaElement {
  protected mount(): void {
    const alignEnd = this.getAttribute('align') === 'end';
    const customMenuClass = this.getAttribute('menu-class') || '';
    const customRootClass = this.mergeClass(ROOT_CLASS);
    this.removeAttribute('menu-class');
    this.removeAttribute('align');

    const childNodes = Array.from(this.childNodes);
    const elements = childNodes.filter(
      (n) => n.nodeType === Node.ELEMENT_NODE,
    ) as Element[];
    const trigger = elements[0] ?? null;
    const menuNodes = trigger ? childNodes.filter((n) => n !== trigger) : childNodes;

    while (this.firstChild) this.removeChild(this.firstChild);

    if (trigger) {
      trigger.setAttribute('aria-haspopup', 'menu');
      trigger.setAttribute('x-bind:aria-expanded', 'isOpen');
    }

    const root = document.createElement('div');
    root.setAttribute('x-data', DROPDOWN_X_DATA);
    root.setAttribute('x-on:keydown.escape.window', 'isOpen = false');
    root.setAttribute('x-on:eisma-dropdown-close', 'isOpen = false');
    root.setAttribute('x-on:click.outside', 'isOpen = false');
    root.className = customRootClass;

    const triggerWrap = document.createElement('div');
    triggerWrap.setAttribute('x-on:click', 'toggle()');
    triggerWrap.className = 'inline-block';
    if (trigger) triggerWrap.appendChild(trigger);

    const menu = document.createElement('div');
    menu.setAttribute('x-show', 'isOpen');
    menu.setAttribute('x-cloak', '');
    menu.setAttribute('x-transition.opacity.duration.100ms', '');
    menu.setAttribute('role', 'menu');
    menu.setAttribute('style', 'display: none');
    menu.setAttribute(
      'x-bind:class',
      `{
        'top-full mt-2': pos === 'bottom',
        'bottom-full mb-2': pos === 'top',
        '${alignEnd ? 'right-0' : 'left-0'}': true
      }`,
    );
    menu.className = [MENU_BASE, customMenuClass].filter(Boolean).join(' ').trim();
    menuNodes.forEach((n) => menu.appendChild(n));

    root.appendChild(triggerWrap);
    root.appendChild(menu);
    this.appendChild(root);
  }
}

const ITEM_CONSUMED = ['class', 'destructive', 'x-on:click', '@click'];

export class EismaDropdownItem extends EismaElement {
  protected mount(): void {
    const href = this.getAttribute('href');
    const isDestructive = this.hasAttribute('destructive');
    const existingClick =
      this.getAttribute('x-on:click') || this.getAttribute('@click') || '';

    const cls = this.mergeClass(
      `${ITEM_BASE}${isDestructive ? ' ' + ITEM_DESTRUCTIVE : ''}`,
    );

    const el = document.createElement(href ? 'a' : 'button');
    el.className = cls;
    if (!href) (el as HTMLButtonElement).type = 'button';
    el.setAttribute('role', 'menuitem');

    this.passThroughAttributes(el, ITEM_CONSUMED);

    const dispatch = "$dispatch('eisma-dropdown-close')";
    el.setAttribute(
      'x-on:click',
      existingClick ? `${existingClick}; ${dispatch}` : dispatch,
    );

    this.moveChildren(el);
    ITEM_CONSUMED.forEach((a) => this.removeAttribute(a));

    this.appendChild(el);
  }
}

export class EismaDropdownSeparator extends EismaElement {
  protected mount(): void {
    const cls = this.mergeClass(SEPARATOR_CLASS);
    const div = document.createElement('div');
    div.setAttribute('role', 'separator');
    div.className = cls;
    this.appendChild(div);
  }
}

export class EismaDropdownLabel extends EismaElement {
  protected mount(): void {
    const cls = this.mergeClass(LABEL_CLASS);
    const div = document.createElement('div');
    div.className = cls;
    this.moveChildren(div);
    this.appendChild(div);
  }
}
