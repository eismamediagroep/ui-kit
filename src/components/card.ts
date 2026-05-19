import { EismaElement } from '../base';
import { SHADOW_RING } from "../shadows";

const CARD_CLASS =
  'rounded-xl bg-white text-neutral-950 p-6 ' + SHADOW_RING + ' ' +
  'dark:bg-neutral-950 dark:text-neutral-50';

export class EismaCard extends EismaElement {
  protected mount(): void {
    const cls = this.mergeClass(CARD_CLASS);

    const div = document.createElement('div');
    div.className = cls;

    this.passThroughAttributes(div, ['class']);
    this.moveChildren(div);

    this.style.display = 'block';
    this.appendChild(div);
  }
}
