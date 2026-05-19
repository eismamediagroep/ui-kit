import { EismaElement } from '../base';

const ITEM_CLASS = 'border-b border-neutral-200 dark:border-neutral-800';

const TRIGGER_CLASS =
  'flex w-full flex-1 items-center justify-between py-4 text-sm font-medium ' +
  'transition-all text-left cursor-pointer ' +
  'hover:underline ' +
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 ' +
  'dark:focus-visible:ring-neutral-300';

const CONTENT_CLASS = 'pb-4 pt-0 text-sm text-neutral-700 dark:text-neutral-300';

let itemCounter = 0;

export class EismaAccordion extends EismaElement {
  protected mount(): void {
    const isMultiple = this.getAttribute('type') === 'multiple';
    const customClass = this.mergeClass('w-full');

    const root = document.createElement('div');
    // Single mode: `active` holds the open item's value (null when all closed).
    // Multiple mode: items manage their own state independently, so the parent
    // scope is empty (`{}`) and triggers fall back to per-item x-data.
    root.setAttribute(
      'x-data',
      isMultiple ? '{}' : '{ active: null }',
    );
    root.setAttribute('data-type', isMultiple ? 'multiple' : 'single');
    root.className = customClass;

    this.moveChildren(root);
    this.removeAttribute('type');

    this.style.display = 'block';
    this.appendChild(root);
  }
}

export class EismaAccordionItem extends EismaElement {
  protected mount(): void {
    const value = this.getAttribute('value') || `eisma-accordion-item-${++itemCounter}`;
    const customClass = this.mergeClass(ITEM_CLASS);

    // Persist value on the host so children can read it via closest().
    this.setAttribute('data-value', value);
    this.removeAttribute('value');

    // For multiple-open accordions: each item needs its own scope. Inserting
    // an x-data here gives triggers/content a local `isOpen` to toggle that
    // shadows the parent's empty scope.
    const parent = this.closest('eisma-accordion');
    const isMultiple = parent?.firstElementChild?.getAttribute('data-type') === 'multiple';

    const wrapper = document.createElement('div');
    wrapper.className = customClass;
    if (isMultiple) {
      wrapper.setAttribute('x-data', '{ isOpen: false }');
    }
    wrapper.setAttribute('data-value', value);

    this.moveChildren(wrapper);
    this.style.display = 'block';
    this.appendChild(wrapper);
  }
}

const TRIGGER_CONSUMED = ['class'];

export class EismaAccordionTrigger extends EismaElement {
  protected mount(): void {
    const itemHost = this.closest('eisma-accordion-item') as Element | null;
    const value = itemHost?.getAttribute('data-value') || '';
    const parent = this.closest('eisma-accordion');
    const isMultiple = parent?.firstElementChild?.getAttribute('data-type') === 'multiple';

    const customClass = this.mergeClass(TRIGGER_CLASS);
    const valueLit = JSON.stringify(value);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = customClass;
    btn.setAttribute('aria-controls', `panel-${value}`);

    if (isMultiple) {
      btn.setAttribute('x-on:click', 'isOpen = !isOpen');
      btn.setAttribute('x-bind:aria-expanded', 'isOpen');
    } else {
      btn.setAttribute(
        'x-on:click',
        `active = active === ${valueLit} ? null : ${valueLit}`,
      );
      btn.setAttribute('x-bind:aria-expanded', `active === ${valueLit}`);
    }

    this.passThroughAttributes(btn, TRIGGER_CONSUMED);
    this.moveChildren(btn);

    // Add chevron that rotates 180° when open.
    const chevron = document.createElement('eisma-icon');
    chevron.setAttribute('name', 'chevron-down');
    chevron.setAttribute('size', '16');
    const isOpenExpr = isMultiple ? 'isOpen' : `active === ${valueLit}`;
    chevron.setAttribute(
      'x-bind:class',
      `${isOpenExpr} ? 'rotate-180 transition-transform shrink-0' : 'transition-transform shrink-0'`,
    );
    btn.appendChild(chevron);

    TRIGGER_CONSUMED.forEach((a) => this.removeAttribute(a));

    this.style.display = 'block';
    this.appendChild(btn);
  }
}

export class EismaAccordionContent extends EismaElement {
  protected mount(): void {
    const itemHost = this.closest('eisma-accordion-item') as Element | null;
    const value = itemHost?.getAttribute('data-value') || '';
    const parent = this.closest('eisma-accordion');
    const isMultiple = parent?.firstElementChild?.getAttribute('data-type') === 'multiple';

    const customClass = this.mergeClass(CONTENT_CLASS);
    const valueLit = JSON.stringify(value);

    const div = document.createElement('div');
    div.id = `panel-${value}`;
    div.setAttribute('role', 'region');
    div.className = customClass;

    const showExpr = isMultiple ? 'isOpen' : `active === ${valueLit}`;
    div.setAttribute('x-show', showExpr);
    div.setAttribute('x-cloak', '');
    div.setAttribute('style', 'display: none');

    this.moveChildren(div);

    this.style.display = 'block';
    this.appendChild(div);
  }
}
