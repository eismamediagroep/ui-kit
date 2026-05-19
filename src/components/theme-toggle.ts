import { EismaElement } from '../base';

const BUTTON_CLASS =
  'inline-flex items-center justify-center h-9 w-9 rounded-md ' +
  'border bg-white text-neutral-950 shadow-sm transition-colors ' +
  'border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900 ' +
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 ' +
  'dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 ' +
  'dark:hover:bg-neutral-800 dark:focus-visible:ring-neutral-300';

const CONSUMED = ['class', 'storage-key', 'light-icon', 'dark-icon'];

export class EismaThemeToggle extends EismaElement {
  protected mount(): void {
    const storageKey = this.getAttribute('storage-key') || 'eisma-theme';
    const lightIconName = this.getAttribute('light-icon') || 'sun';
    const darkIconName = this.getAttribute('dark-icon') || 'moon';
    const cls = this.mergeClass(BUTTON_CLASS);

    const keyLit = JSON.stringify(storageKey);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = cls;
    btn.setAttribute('aria-label', 'Toggle theme');

    this.passThroughAttributes(btn, CONSUMED);

    btn.setAttribute(
      'x-data',
      `{
        dark: (() => {
          const stored = localStorage.getItem(${keyLit});
          if (stored === 'dark') return true;
          if (stored === 'light') return false;
          return window.matchMedia('(prefers-color-scheme: dark)').matches;
        })(),
        apply() { document.documentElement.classList.toggle('dark', this.dark); },
        toggle() {
          this.dark = !this.dark;
          localStorage.setItem(${keyLit}, this.dark ? 'dark' : 'light');
          this.apply();
        }
      }`,
    );
    btn.setAttribute('x-init', 'apply()');
    btn.setAttribute('x-on:click', 'toggle()');
    btn.setAttribute('x-bind:aria-pressed', 'dark');

    const sun = document.createElement('eisma-icon');
    sun.setAttribute('name', lightIconName);
    sun.setAttribute('x-show', '!dark');

    const moon = document.createElement('eisma-icon');
    moon.setAttribute('name', darkIconName);
    moon.setAttribute('x-show', 'dark');

    btn.appendChild(sun);
    btn.appendChild(moon);

    CONSUMED.forEach((a) => this.removeAttribute(a));

    this.appendChild(btn);
  }
}
