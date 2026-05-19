/**
 * Base class for all <eisma-*> custom elements.
 *
 * Defers mount() until DOMContentLoaded if the element is connected mid-parse
 * (so light-DOM children are guaranteed to be present when mount() runs).
 */
export declare abstract class EismaElement extends HTMLElement {
    private _mounted;
    connectedCallback(): void;
    private _doMount;
    protected abstract mount(): void;
    /**
     * Combine library default classes with whatever the consumer put on the host.
     * Removes the host's `class` attribute so styling lives only on the inner wrapper.
     */
    protected mergeClass(defaults: string): string;
    /**
     * Move attributes from the host element to a target element, skipping
     * attributes the component consumes itself. Attributes are removed from
     * the host after copying so Alpine doesn't double-bind handlers (e.g.
     * `x-on:click` ending up on both the host and the inner button would fire
     * the handler twice per click).
     */
    protected passThroughAttributes(target: HTMLElement, consumed: Iterable<string>): void;
    /** Move all child nodes of the host into `target`. */
    protected moveChildren(target: HTMLElement): void;
}
