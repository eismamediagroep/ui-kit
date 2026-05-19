/**
 * Base class for all <eisma-*> custom elements.
 *
 * Defers mount() until DOMContentLoaded if the element is connected mid-parse
 * (so light-DOM children are guaranteed to be present when mount() runs).
 */
export abstract class EismaElement extends HTMLElement {
  private _mounted = false;

  connectedCallback(): void {
    if (this._mounted) return;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this._doMount(), { once: true });
    } else {
      this._doMount();
    }
  }

  private _doMount(): void {
    if (this._mounted || !this.isConnected) return;
    this._mounted = true;
    this.mount();
  }

  protected abstract mount(): void;

  /**
   * Combine library default classes with whatever the consumer put on the host.
   * Removes the host's `class` attribute so styling lives only on the inner wrapper.
   */
  protected mergeClass(defaults: string): string {
    const custom = this.getAttribute('class') || '';
    this.removeAttribute('class');
    return [defaults, custom].filter(Boolean).join(' ').trim();
  }

  /**
   * Move attributes from the host element to a target element, skipping
   * attributes the component consumes itself. Attributes are removed from
   * the host after copying so Alpine doesn't double-bind handlers (e.g.
   * `x-on:click` ending up on both the host and the inner button would fire
   * the handler twice per click).
   */
  protected passThroughAttributes(target: HTMLElement, consumed: Iterable<string>): void {
    const skip = new Set<string>(consumed);
    skip.add('class');
    for (const attr of Array.from(this.attributes)) {
      if (skip.has(attr.name)) continue;
      target.setAttribute(attr.name, attr.value);
      this.removeAttribute(attr.name);
    }
  }

  /** Move all child nodes of the host into `target`. */
  protected moveChildren(target: HTMLElement): void {
    while (this.firstChild) target.appendChild(this.firstChild);
  }
}
