import { EismaElement } from '../base';
import { SHADOW_RING } from "../shadows";

// Internal helper component for the docs site. Not exported in the README —
// consumers don't need this. Wraps escaped text in a styled <pre><code> with
// the right language- class and triggers hljs highlighting if hljs is on the
// page. Background is theme-aware (neutral-50 light / neutral-900 dark);
// hljs CSS controls token colors, which the docs swap by toggling
// `disabled` on the light/dark theme <link> tags.
const PRE_CLASS =
  'rounded-md text-xs p-4 overflow-x-auto ' + SHADOW_RING + ' my-3 ' +
  'bg-neutral-50 dark:bg-neutral-900';

const CONSUMED = ['class', 'language'];

export class EismaCode extends EismaElement {
  protected mount(): void {
    const lang = this.getAttribute('language') || 'html';
    const customClass = this.mergeClass(PRE_CLASS);

    // textContent already decodes &lt; etc. Strip a leading newline so the
    // first line of code isn't indented in the rendered block.
    const content = (this.textContent || '').replace(/^\n/, '').replace(/\s+$/, '');
    while (this.firstChild) this.removeChild(this.firstChild);

    const pre = document.createElement('pre');
    pre.className = customClass;

    const code = document.createElement('code');
    code.className = `language-${lang}`;
    code.textContent = content;
    pre.appendChild(code);

    CONSUMED.forEach((a) => this.removeAttribute(a));
    this.style.display = 'block';
    this.appendChild(pre);

    const hljs = (window as { hljs?: { highlightElement: (el: Element) => void } }).hljs;
    if (hljs) hljs.highlightElement(code);
  }
}
