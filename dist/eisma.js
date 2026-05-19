class h extends HTMLElement {
  constructor() {
    super(...arguments), this._mounted = !1;
  }
  connectedCallback() {
    this._mounted || (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => this._doMount(), { once: !0 }) : this._doMount());
  }
  _doMount() {
    this._mounted || !this.isConnected || (this._mounted = !0, this.mount());
  }
  /**
   * Combine library default classes with whatever the consumer put on the host.
   * Removes the host's `class` attribute so styling lives only on the inner wrapper.
   */
  mergeClass(i) {
    const t = this.getAttribute("class") || "";
    return this.removeAttribute("class"), [i, t].filter(Boolean).join(" ").trim();
  }
  /**
   * Move attributes from the host element to a target element, skipping
   * attributes the component consumes itself. Attributes are removed from
   * the host after copying so Alpine doesn't double-bind handlers (e.g.
   * `x-on:click` ending up on both the host and the inner button would fire
   * the handler twice per click).
   */
  passThroughAttributes(i, t) {
    const s = new Set(t);
    s.add("class");
    for (const e of Array.from(this.attributes))
      s.has(e.name) || (i.setAttribute(e.name, e.value), this.removeAttribute(e.name));
  }
  /** Move all child nodes of the host into `target`. */
  moveChildren(i) {
    for (; this.firstChild; ) i.appendChild(this.firstChild);
  }
}
const A = "inset_0_1px_0_rgb(255_255_255_/_0.65)", v = "0_0_0_1px_rgb(0_0_0_/_0.06)", J = "0_1px_2px_0_rgb(0_0_0_/_0.04)", V = "0_4px_12px_0_rgb(0_0_0_/_0.08)", G = "0_16px_40px_0_rgb(0_0_0_/_0.18)", C = "inset_0_1px_0_rgb(255_255_255_/_0.06)", k = "0_0_0_1px_rgb(255_255_255_/_0.25)", q = "0_1px_2px_0_rgb(0_0_0_/_0.4)", F = "0_4px_12px_0_rgb(0_0_0_/_0.5)", K = "0_16px_40px_0_rgb(0_0_0_/_0.6)", g = `shadow-[${A},${v},${J}] dark:shadow-[${C},${k},${q}]`, W = `shadow-[${A},${v},${V}] dark:shadow-[${C},${k},${F}]`, H = `shadow-[${A},${v},${G}] dark:shadow-[${C},${k},${K}]`, Y = "fixed inset-0 z-50 flex items-center justify-center p-4", X = "absolute inset-0 bg-black/80 backdrop-blur-sm", Z = "relative w-full max-w-lg gap-4 rounded-lg p-6 " + H + " bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50", Q = [
  "class",
  "backdrop-class",
  "overlay-class",
  "close-on-escape",
  "close-on-backdrop",
  "aria-label",
  "aria-labelledby"
];
class tt extends h {
  mount() {
    const i = this.id;
    i || console.warn("<eisma-modal> requires an `id` attribute so buttons can target it.");
    const t = this.mergeClass(Z), s = this.getAttribute("overlay-class") || Y, e = this.getAttribute("backdrop-class") || X, a = this.getAttribute("close-on-escape") !== "false", n = this.getAttribute("close-on-backdrop") !== "false", o = this.getAttribute("aria-labelledby"), d = this.getAttribute("aria-label");
    Q.forEach((p) => this.removeAttribute(p));
    const u = JSON.stringify(i), l = document.createElement("div");
    l.setAttribute("role", "dialog"), l.setAttribute("aria-modal", "true"), o ? l.setAttribute("aria-labelledby", o) : d && l.setAttribute("aria-label", d), l.setAttribute("tabindex", "-1"), l.setAttribute("x-data", "{ isOpen: false }"), l.setAttribute("x-show", "isOpen"), l.setAttribute("x-cloak", ""), l.setAttribute("x-transition.opacity", ""), l.setAttribute("x-trap.inert.noscroll", "isOpen"), l.setAttribute("style", "display: none"), l.setAttribute(
      "x-on:eisma-modal-toggle.window",
      `if ($event.detail.id === ${u}) isOpen = !isOpen`
    ), l.setAttribute(
      "x-on:eisma-modal-open.window",
      `if ($event.detail.id === ${u}) isOpen = true`
    ), l.setAttribute(
      "x-on:eisma-modal-close.window",
      `if ($event.detail.id === ${u}) isOpen = false`
    ), a && l.setAttribute("x-on:keydown.escape.window", "isOpen = false"), l.className = s;
    const b = document.createElement("div");
    b.className = e, n && b.setAttribute("x-on:click", "isOpen = false");
    const c = document.createElement("div");
    c.className = t, this.moveChildren(c), l.appendChild(b), l.appendChild(c), this.appendChild(l);
  }
}
const et = "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300 disabled:pointer-events-none disabled:opacity-50", E = {
  default: "bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
  primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground shadow hover:bg-secondary/90",
  outline: "bg-white " + g + " hover:bg-neutral-100 hover:text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
  ghost: "hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
  destructive: "bg-red-600 text-neutral-50 shadow-sm hover:bg-red-600/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
  link: "text-primary underline-offset-4 hover:underline"
}, y = {
  default: "h-9 rounded-md px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-lg px-8",
  icon: "h-9 w-9 rounded-md"
}, w = [
  "class",
  "modal",
  "open",
  "close",
  "toggle",
  "variant",
  "size",
  "icon-left",
  "icon-right",
  "icon-library"
];
class st extends h {
  mount() {
    const i = this.getAttribute("modal"), t = this.hasAttribute("open") ? "open" : this.hasAttribute("close") ? "close" : "toggle", s = this.getAttribute("variant") || "default", e = this.getAttribute("size") || "default", a = this.getAttribute("icon-left"), n = this.getAttribute("icon-right"), o = this.getAttribute("icon-library") || "lucide", d = E[s] ?? E.default, u = y[e] ?? y.default, l = this.mergeClass(`${et} ${d} ${u}`), b = this.getAttribute("href") || this.getAttribute(":href"), c = document.createElement(b ? "a" : "button");
    c.className = l, this.passThroughAttributes(c, w), !b && !c.hasAttribute("type") && c.setAttribute("type", "button"), i && (c.setAttribute("x-data", ""), c.setAttribute(
      "x-on:click",
      `$dispatch('eisma-modal-${t}', { id: ${JSON.stringify(i)} })`
    )), a && c.appendChild(_(a, o, e)), this.moveChildren(c), n && c.appendChild(_(n, o, e)), w.forEach((p) => this.removeAttribute(p)), this.appendChild(c);
  }
}
function _(r, i, t) {
  const s = document.createElement("eisma-icon");
  return s.setAttribute("name", r), s.setAttribute("size", t === "lg" ? "18" : "16"), i !== "lucide" && s.setAttribute("library", i), s;
}
const it = "flex h-9 w-full rounded-md bg-white px-3 pt-1 pb-1.5 text-sm transition-colors " + g + " text-neutral-950 placeholder:text-neutral-500 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:file:text-neutral-50 dark:focus-visible:ring-neutral-300", S = ["class", "icon-left", "icon-right"];
class nt extends h {
  mount() {
    const i = this.getAttribute("icon-left"), t = this.getAttribute("icon-right");
    let s = it;
    i && (s += " pl-8"), t && (s += " pr-8");
    const e = this.mergeClass(s), a = document.createElement("input");
    if (a.className = e, this.passThroughAttributes(a, S), a.hasAttribute("type") || a.setAttribute("type", "text"), S.forEach((o) => this.removeAttribute(o)), this.style.display = "block", !i && !t) {
      this.appendChild(a);
      return;
    }
    const n = document.createElement("div");
    n.className = "grid w-full grid-cols-1 grid-rows-1 items-center", a.style.gridArea = "1 / 1", i && n.appendChild($(i, "left")), n.appendChild(a), t && n.appendChild($(t, "right")), this.appendChild(n);
  }
}
function $(r, i) {
  const t = document.createElement("eisma-icon");
  return t.setAttribute("name", r), t.setAttribute("size", "16"), t.setAttribute("class", "text-neutral-500 dark:text-neutral-400"), t.style.gridArea = "1 / 1", t.style.alignSelf = "center", t.style.justifySelf = i === "left" ? "start" : "end", t.style[i === "left" ? "marginLeft" : "marginRight"] = ".65rem", t.style.transform = "translateY(-1px)", t.style.zIndex = "10", t.style.pointerEvents = "none", t;
}
const at = "block h-9 w-full rounded-md bg-white appearance-none px-3 py-1 pr-9 text-sm " + g + " transition-colors text-neutral-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-950 dark:text-neutral-50 dark:focus-visible:ring-neutral-300";
class rt extends h {
  mount() {
    const i = this.mergeClass(at), t = document.createElement("select");
    t.className = i, this.passThroughAttributes(t, []), this.moveChildren(t);
    const s = document.createElement("div");
    s.className = "grid w-full grid-cols-1 grid-rows-1 items-center", t.style.gridArea = "1 / 1", s.appendChild(t);
    const e = document.createElement("eisma-icon");
    e.setAttribute("name", "chevron-down"), e.setAttribute("size", "16"), e.setAttribute("class", "text-neutral-500 dark:text-neutral-400"), e.style.gridArea = "1 / 1", e.style.alignSelf = "center", e.style.justifySelf = "end", e.style.marginRight = "0.75rem", e.style.zIndex = "10", e.style.pointerEvents = "none", s.appendChild(e), this.style.display = "block", this.appendChild(s);
  }
}
const ot = "flex min-h-[60px] w-full rounded-md bg-white px-3 py-2 text-sm " + g + " transition-colors text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300";
class lt extends h {
  mount() {
    const i = this.mergeClass(ot), t = (this.textContent || "").replace(/^\s+|\s+$/g, "");
    for (; this.firstChild; ) this.removeChild(this.firstChild);
    const s = document.createElement("textarea");
    s.className = i, this.passThroughAttributes(s, []), t && (s.value = t), this.style.display = "block", this.appendChild(s);
  }
}
const dt = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:focus:ring-neutral-300", N = {
  default: "border-transparent bg-neutral-900 text-neutral-50 hover:bg-neutral-900/80 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/80",
  secondary: "border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
  destructive: "border-transparent bg-red-600 text-neutral-50 hover:bg-red-600/80 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/80",
  outline: "text-neutral-950 border-transparent " + g + " dark:text-neutral-50"
}, O = ["class", "variant"];
class ct extends h {
  mount() {
    const i = this.getAttribute("variant") || "default", t = N[i] ?? N.default, s = this.mergeClass(`${dt} ${t}`), e = document.createElement("span");
    e.className = s, this.passThroughAttributes(e, O), this.moveChildren(e), O.forEach((a) => this.removeAttribute(a)), this.appendChild(e);
  }
}
const ut = "relative w-full rounded-lg p-4 [&>svg+div]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4", T = {
  default: "bg-white text-neutral-950 " + g + " [&>svg]:text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50 dark:[&>svg]:text-neutral-50",
  info: "bg-blue-50 text-blue-900 border border-blue-200 [&>svg]:text-blue-600 dark:bg-blue-950/40 dark:text-blue-100 dark:border-blue-900 dark:[&>svg]:text-blue-400",
  warning: "bg-amber-50 text-amber-900 border border-amber-200 [&>svg]:text-amber-600 dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-900 dark:[&>svg]:text-amber-400",
  destructive: "bg-red-50 text-red-900 border border-red-200 [&>svg]:text-red-600 dark:bg-red-950/40 dark:text-red-100 dark:border-red-900 dark:[&>svg]:text-red-400"
}, ht = "mb-1 font-medium leading-none tracking-tight", mt = "text-sm [&_p]:leading-relaxed", L = ["class", "variant", "title"];
class bt extends h {
  mount() {
    const i = this.getAttribute("variant") || "default", t = this.getAttribute("title"), s = T[i] ?? T.default, e = this.mergeClass(`${ut} ${s}`), a = Array.from(this.childNodes), n = document.createElement("div");
    n.setAttribute("role", "alert"), n.className = e, this.passThroughAttributes(n, L);
    let o = null;
    const d = a.find((l) => l.nodeType === Node.ELEMENT_NODE);
    if (d && (d.tagName === "SVG" || d.tagName === "EISMA-ICON") && (o = d, a.splice(a.indexOf(d), 1)), o && n.appendChild(o), t) {
      const l = document.createElement("h5");
      l.className = ht, l.textContent = t, n.appendChild(l);
    }
    const u = document.createElement("div");
    u.className = mt, a.forEach((l) => u.appendChild(l)), n.appendChild(u), L.forEach((l) => this.removeAttribute(l)), this.style.display = "block", this.appendChild(n);
  }
}
const pt = "h-4 w-4 shrink-0 rounded-sm border border-neutral-300 text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 dark:focus-visible:ring-neutral-300", gt = "inline-flex items-center gap-2 text-sm font-medium leading-none text-neutral-950 dark:text-neutral-50 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-70", ft = ["class"], xt = /* @__PURE__ */ new Set([
  "name",
  "value",
  "checked",
  "disabled",
  "required",
  "form",
  "id",
  "aria-describedby",
  "aria-label",
  "aria-labelledby"
]);
class At extends h {
  mount() {
    const i = this.mergeClass(gt), t = document.createElement("label");
    t.className = i;
    const s = document.createElement("input");
    s.type = "checkbox", s.className = pt;
    for (const e of Array.from(this.attributes))
      (xt.has(e.name) || e.name.startsWith("data-")) && s.setAttribute(e.name, e.value);
    if (t.appendChild(s), this.childNodes.length) {
      const e = document.createElement("span");
      this.moveChildren(e), t.appendChild(e);
    }
    ft.forEach((e) => this.removeAttribute(e)), this.appendChild(t);
  }
}
const vt = "h-4 w-4 shrink-0 rounded-full border border-neutral-300 text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 dark:focus-visible:ring-neutral-300", Ct = "inline-flex items-center gap-2 text-sm font-medium leading-none text-neutral-950 dark:text-neutral-50 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-70", kt = /* @__PURE__ */ new Set([
  "name",
  "value",
  "checked",
  "disabled",
  "required",
  "form",
  "id",
  "aria-describedby",
  "aria-label",
  "aria-labelledby"
]);
class Et extends h {
  mount() {
    const i = this.mergeClass(Ct), t = document.createElement("label");
    t.className = i;
    const s = document.createElement("input");
    s.type = "radio", s.className = vt;
    for (const e of Array.from(this.attributes))
      (kt.has(e.name) || e.name.startsWith("data-")) && s.setAttribute(e.name, e.value);
    if (t.appendChild(s), this.childNodes.length) {
      const e = document.createElement("span");
      this.moveChildren(e), t.appendChild(e);
    }
    this.appendChild(t);
  }
}
const yt = "absolute z-50 min-w-[8rem] overflow-hidden rounded-md p-1 " + W + " bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50", wt = "relative inline-block", _t = "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors text-left hover:bg-neutral-100 hover:text-neutral-900 focus-visible:bg-neutral-100 focus-visible:text-neutral-900 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus-visible:bg-neutral-800 dark:focus-visible:text-neutral-50", St = "text-red-600 hover:text-red-600 focus-visible:text-red-600 hover:bg-red-100 focus-visible:bg-red-100 dark:text-red-400 dark:hover:bg-red-950 dark:focus-visible:bg-red-950", $t = "-mx-1 my-1 h-px bg-neutral-200 dark:bg-neutral-800", Nt = "px-2 py-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400", Ot = `{
  isOpen: false,
  pos: 'bottom',
  toggle() { if (!this.isOpen) this.measure(); this.isOpen = !this.isOpen; },
  measure() {
    const r = this.$el.getBoundingClientRect();
    const below = window.innerHeight - r.bottom;
    this.pos = (below < 240 && r.top > below) ? 'top' : 'bottom';
  }
}`;
class Tt extends h {
  mount() {
    const i = this.getAttribute("align") === "end", t = this.getAttribute("menu-class") || "", s = this.mergeClass(wt);
    this.removeAttribute("menu-class"), this.removeAttribute("align");
    const e = Array.from(this.childNodes), n = e.filter(
      (b) => b.nodeType === Node.ELEMENT_NODE
    )[0] ?? null, o = n ? e.filter((b) => b !== n) : e;
    for (; this.firstChild; ) this.removeChild(this.firstChild);
    n && (n.setAttribute("aria-haspopup", "menu"), n.setAttribute("x-bind:aria-expanded", "isOpen"));
    const d = document.createElement("div");
    d.setAttribute("x-data", Ot), d.setAttribute("x-on:keydown.escape.window", "isOpen = false"), d.setAttribute("x-on:eisma-dropdown-close", "isOpen = false"), d.setAttribute("x-on:click.outside", "isOpen = false"), d.className = s;
    const u = document.createElement("div");
    u.setAttribute("x-on:click", "toggle()"), u.className = "inline-block", n && u.appendChild(n);
    const l = document.createElement("div");
    l.setAttribute("x-show", "isOpen"), l.setAttribute("x-cloak", ""), l.setAttribute("x-transition.opacity.duration.100ms", ""), l.setAttribute("role", "menu"), l.setAttribute("style", "display: none"), l.setAttribute(
      "x-bind:class",
      `{
        'top-full mt-2': pos === 'bottom',
        'bottom-full mb-2': pos === 'top',
        '${i ? "right-0" : "left-0"}': true
      }`
    ), l.className = [yt, t].filter(Boolean).join(" ").trim(), o.forEach((b) => l.appendChild(b)), d.appendChild(u), d.appendChild(l), this.appendChild(d);
  }
}
const D = ["class", "destructive", "x-on:click", "@click"];
class Lt extends h {
  mount() {
    const i = this.getAttribute("href"), t = this.hasAttribute("destructive"), s = this.getAttribute("x-on:click") || this.getAttribute("@click") || "", e = this.mergeClass(
      `${_t}${t ? " " + St : ""}`
    ), a = document.createElement(i ? "a" : "button");
    a.className = e, i || (a.type = "button"), a.setAttribute("role", "menuitem"), this.passThroughAttributes(a, D);
    const n = "$dispatch('eisma-dropdown-close')";
    a.setAttribute(
      "x-on:click",
      s ? `${s}; ${n}` : n
    ), this.moveChildren(a), D.forEach((o) => this.removeAttribute(o)), this.appendChild(a);
  }
}
class Dt extends h {
  mount() {
    const i = this.mergeClass($t), t = document.createElement("div");
    t.setAttribute("role", "separator"), t.className = i, this.appendChild(t);
  }
}
class Rt extends h {
  mount() {
    const i = this.mergeClass(Nt), t = document.createElement("div");
    t.className = i, this.moveChildren(t), this.appendChild(t);
  }
}
const R = {
  lucide: (r) => `https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/${r}.svg`,
  heroicons: (r) => `https://cdn.jsdelivr.net/npm/heroicons@latest/24/outline/${r}.svg`,
  "heroicons-solid": (r) => `https://cdn.jsdelivr.net/npm/heroicons@latest/24/solid/${r}.svg`,
  "heroicons-mini": (r) => `https://cdn.jsdelivr.net/npm/heroicons@latest/20/solid/${r}.svg`,
  "fa-brands": (r) => `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/svgs/brands/${r}.svg`,
  "fa-solid": (r) => `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/svgs/solid/${r}.svg`,
  "fa-regular": (r) => `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/svgs/regular/${r}.svg`
}, x = /* @__PURE__ */ new Map();
function I(r) {
  const i = x.get(r);
  if (i) return i;
  const t = fetch(r).then((s) => {
    if (!s.ok) throw new Error(`eisma-icon: ${s.status} fetching ${r}`);
    return s.text();
  });
  return x.set(r, t), t.catch(() => x.delete(r)), t;
}
const It = "block shrink-0", Mt = ["class", "name", "library", "size", "src"];
class Bt extends h {
  mount() {
    const i = this.getAttribute("name"), t = this.getAttribute("src"), s = this.getAttribute("library") || "lucide", e = this.getAttribute("size") || "16", a = this.mergeClass(It), n = /^\d+(\.\d+)?$/.test(e) ? `${e}px` : e;
    if (this.style.display = "inline-flex", this.style.alignItems = "center", this.style.justifyContent = "center", this.style.width = n, this.style.height = n, Mt.forEach((d) => this.removeAttribute(d)), t) {
      I(t).then((d) => M(this, d, e, a, null)).catch((d) => console.warn(d));
      return;
    }
    if (i) {
      const d = (R[s] ?? R.lucide)(i);
      I(d).then((u) => M(this, u, e, a, s)).catch((u) => console.warn(u));
      return;
    }
    const o = this.querySelector("svg");
    if (o) {
      o.setAttribute("width", e), o.setAttribute("height", e), o.setAttribute("class", a), o.hasAttribute("aria-hidden") || o.setAttribute("aria-hidden", "true");
      return;
    }
    console.warn("<eisma-icon> requires a `name`, `src`, or an inline <svg> child.");
  }
}
function M(r, i, t, s, e) {
  const a = document.createElement("template");
  a.innerHTML = i.trim();
  const n = a.content.querySelector("svg");
  n && (n.querySelectorAll("script").forEach((o) => o.remove()), n.setAttribute("width", t), n.setAttribute("height", t), n.setAttribute("aria-hidden", "true"), n.setAttribute("class", s), (e === "fa-brands" || e === "fa-solid" || e === "fa-regular") && n.setAttribute("fill", "currentColor"), r.appendChild(n));
}
const Ut = "inline-flex items-center justify-center h-9 w-9 rounded-md border bg-white text-neutral-950 shadow-sm transition-colors border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:ring-neutral-300", B = ["class", "storage-key", "light-icon", "dark-icon"];
class Pt extends h {
  mount() {
    const i = this.getAttribute("storage-key") || "eisma-theme", t = this.getAttribute("light-icon") || "sun", s = this.getAttribute("dark-icon") || "moon", e = this.mergeClass(Ut), a = JSON.stringify(i), n = document.createElement("button");
    n.type = "button", n.className = e, n.setAttribute("aria-label", "Toggle theme"), this.passThroughAttributes(n, B), n.setAttribute(
      "x-data",
      `{
        dark: (() => {
          const stored = localStorage.getItem(${a});
          if (stored === 'dark') return true;
          if (stored === 'light') return false;
          return window.matchMedia('(prefers-color-scheme: dark)').matches;
        })(),
        apply() { document.documentElement.classList.toggle('dark', this.dark); },
        toggle() {
          this.dark = !this.dark;
          localStorage.setItem(${a}, this.dark ? 'dark' : 'light');
          this.apply();
        }
      }`
    ), n.setAttribute("x-init", "apply()"), n.setAttribute("x-on:click", "toggle()"), n.setAttribute("x-bind:aria-pressed", "dark");
    const o = document.createElement("eisma-icon");
    o.setAttribute("name", t), o.setAttribute("x-show", "!dark");
    const d = document.createElement("eisma-icon");
    d.setAttribute("name", s), d.setAttribute("x-show", "dark"), n.appendChild(o), n.appendChild(d), B.forEach((u) => this.removeAttribute(u)), this.appendChild(n);
  }
}
const jt = "absolute z-50 pointer-events-none rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shadow-md bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900", U = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2"
};
let zt = 0;
class Jt extends h {
  mount() {
    const i = this.getAttribute("text") || "", t = this.getAttribute("side") || "top", s = this.getAttribute("trigger") || "hover", e = U[t] ?? U.top, a = this.mergeClass("");
    i || console.warn("<eisma-tooltip> requires a `text` attribute.");
    const n = `eisma-tooltip-${++zt}`, o = this.id || "", d = JSON.stringify(o), u = JSON.stringify(i), l = Array.from(this.childNodes), b = l.find(
      (f) => f.nodeType === Node.ELEMENT_NODE
    );
    for (b && b.setAttribute("aria-describedby", n); this.firstChild; ) this.removeChild(this.firstChild);
    const c = document.createElement("span");
    c.setAttribute(
      "x-data",
      `{ isOpen: false, text: ${u}, original: ${u} }`
    ), c.className = "relative inline-block", s === "click" ? (c.setAttribute("x-on:click", "isOpen = !isOpen"), c.setAttribute("x-on:click.outside", "isOpen = false"), c.setAttribute("x-on:keydown.escape.window", "isOpen = false")) : s !== "manual" && (c.setAttribute("x-on:mouseenter", "isOpen = true"), c.setAttribute("x-on:mouseleave", "isOpen = false"), c.setAttribute("x-on:focusin", "isOpen = true"), c.setAttribute("x-on:focusout", "isOpen = false")), o && (c.setAttribute(
      "x-on:eisma-tooltip-show.window",
      `if ($event.detail.id === ${d}) {
          if ($event.detail.text) text = $event.detail.text;
          isOpen = true;
        }`
    ), c.setAttribute(
      "x-on:eisma-tooltip-hide.window",
      `if ($event.detail.id === ${d}) isOpen = false`
    ), c.setAttribute(
      "x-on:eisma-tooltip-toggle.window",
      `if ($event.detail.id === ${d}) {
          if ($event.detail.text) text = $event.detail.text;
          isOpen = !isOpen;
        }`
    ), c.setAttribute(
      "x-on:eisma-tooltip-flash.window",
      `if ($event.detail.id === ${d}) {
          if ($event.detail.text) text = $event.detail.text;
          isOpen = true;
          if ($el._tipFlash) clearTimeout($el._tipFlash);
          $el._tipFlash = setTimeout(() => {
            isOpen = false;
            text = original;
          }, $event.detail.duration || 1500);
        }`
    )), l.forEach((f) => c.appendChild(f));
    const p = document.createElement("div");
    p.id = n, p.setAttribute("role", "tooltip"), p.setAttribute("x-show", "isOpen"), p.setAttribute("x-text", "text"), p.setAttribute("x-cloak", ""), p.setAttribute("style", "display: none"), p.className = [jt, e, a].filter(Boolean).join(" "), c.appendChild(p), this.appendChild(c);
  }
}
const Vt = "relative inline-flex items-center gap-3 text-sm font-medium leading-none text-neutral-950 dark:text-neutral-50 cursor-pointer has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-70", Gt = "inline-block h-5 w-9 shrink-0 rounded-full transition-colors bg-neutral-200 peer-checked:bg-neutral-900 dark:bg-neutral-800 dark:peer-checked:bg-neutral-50 peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-950 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-neutral-300 dark:peer-focus-visible:ring-offset-neutral-950", qt = "pointer-events-none absolute h-4 w-4 rounded-full shadow transition-transform left-0.5 top-1/2 -translate-y-1/2 peer-checked:translate-x-4 bg-white dark:bg-neutral-950", Ft = /* @__PURE__ */ new Set([
  "name",
  "value",
  "checked",
  "disabled",
  "required",
  "form",
  "id",
  "aria-describedby",
  "aria-label",
  "aria-labelledby"
]);
class Kt extends h {
  mount() {
    const i = this.mergeClass(Vt), t = document.createElement("label");
    t.className = i;
    const s = document.createElement("input");
    s.type = "checkbox", s.setAttribute("role", "switch"), s.className = "peer sr-only";
    for (const n of Array.from(this.attributes))
      (Ft.has(n.name) || n.name.startsWith("data-")) && (s.setAttribute(n.name, n.value), this.removeAttribute(n.name));
    const e = document.createElement("span");
    e.className = Gt;
    const a = document.createElement("span");
    if (a.className = qt, t.appendChild(s), t.appendChild(e), t.appendChild(a), this.childNodes.length) {
      const n = document.createElement("span");
      this.moveChildren(n), t.appendChild(n);
    }
    this.appendChild(t);
  }
}
const Wt = "inline-flex h-9 items-center justify-center rounded-lg p-1 bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400", Ht = "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-300", Yt = "bg-white text-neutral-950 shadow dark:bg-neutral-950 dark:text-neutral-50", Xt = "mt-2 focus-visible:outline-none";
class Zt extends h {
  mount() {
    const i = this.getAttribute("default") || "", t = this.mergeClass("w-full"), s = document.createElement("div");
    s.setAttribute("x-data", `{ active: ${JSON.stringify(i)} }`), s.className = t, this.moveChildren(s), this.removeAttribute("default"), this.style.display = "block", this.appendChild(s);
  }
}
class Qt extends h {
  mount() {
    const i = this.mergeClass(Wt), t = document.createElement("div");
    t.setAttribute("role", "tablist"), t.className = i, this.moveChildren(t), this.appendChild(t);
  }
}
const P = ["class", "value"];
class te extends h {
  mount() {
    const i = this.getAttribute("value") || "", t = JSON.stringify(i), s = this.mergeClass(Ht), e = document.createElement("button");
    e.type = "button", e.setAttribute("role", "tab"), e.className = s, this.passThroughAttributes(e, P), e.setAttribute("x-on:click", `active = ${t}`), e.setAttribute("x-bind:aria-selected", `active === ${t}`), e.setAttribute(
      "x-bind:class",
      `active === ${t} ? ${JSON.stringify(Yt)} : ''`
    ), e.setAttribute("x-bind:tabindex", `active === ${t} ? 0 : -1`), this.moveChildren(e), P.forEach((a) => this.removeAttribute(a)), this.appendChild(e);
  }
}
const j = ["class", "value"];
class ee extends h {
  mount() {
    const i = this.getAttribute("value") || "", t = JSON.stringify(i), s = this.mergeClass(Xt), e = document.createElement("div");
    e.setAttribute("role", "tabpanel"), e.setAttribute("tabindex", "0"), e.className = s, e.setAttribute("x-show", `active === ${t}`), e.setAttribute("x-cloak", ""), e.setAttribute("style", "display: none"), this.passThroughAttributes(e, j), this.moveChildren(e), j.forEach((a) => this.removeAttribute(a)), this.style.display = "block", this.appendChild(e);
  }
}
const se = "border-b border-neutral-200 dark:border-neutral-800", ie = "flex w-full flex-1 items-center justify-between py-4 text-sm font-medium transition-all text-left cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300", ne = "pb-4 pt-0 text-sm text-neutral-700 dark:text-neutral-300";
let ae = 0;
class re extends h {
  mount() {
    const i = this.getAttribute("type") === "multiple", t = this.mergeClass("w-full"), s = document.createElement("div");
    s.setAttribute(
      "x-data",
      i ? "{}" : "{ active: null }"
    ), s.setAttribute("data-type", i ? "multiple" : "single"), s.className = t, this.moveChildren(s), this.removeAttribute("type"), this.style.display = "block", this.appendChild(s);
  }
}
class oe extends h {
  mount() {
    var n;
    const i = this.getAttribute("value") || `eisma-accordion-item-${++ae}`, t = this.mergeClass(se);
    this.setAttribute("data-value", i), this.removeAttribute("value");
    const s = this.closest("eisma-accordion"), e = ((n = s == null ? void 0 : s.firstElementChild) == null ? void 0 : n.getAttribute("data-type")) === "multiple", a = document.createElement("div");
    a.className = t, e && a.setAttribute("x-data", "{ isOpen: false }"), a.setAttribute("data-value", i), this.moveChildren(a), this.style.display = "block", this.appendChild(a);
  }
}
const z = ["class"];
class le extends h {
  mount() {
    var l;
    const i = this.closest("eisma-accordion-item"), t = (i == null ? void 0 : i.getAttribute("data-value")) || "", s = this.closest("eisma-accordion"), e = ((l = s == null ? void 0 : s.firstElementChild) == null ? void 0 : l.getAttribute("data-type")) === "multiple", a = this.mergeClass(ie), n = JSON.stringify(t), o = document.createElement("button");
    o.type = "button", o.className = a, o.setAttribute("aria-controls", `panel-${t}`), e ? (o.setAttribute("x-on:click", "isOpen = !isOpen"), o.setAttribute("x-bind:aria-expanded", "isOpen")) : (o.setAttribute(
      "x-on:click",
      `active = active === ${n} ? null : ${n}`
    ), o.setAttribute("x-bind:aria-expanded", `active === ${n}`)), this.passThroughAttributes(o, z), this.moveChildren(o);
    const d = document.createElement("eisma-icon");
    d.setAttribute("name", "chevron-down"), d.setAttribute("size", "16");
    const u = e ? "isOpen" : `active === ${n}`;
    d.setAttribute(
      "x-bind:class",
      `${u} ? 'rotate-180 transition-transform shrink-0' : 'transition-transform shrink-0'`
    ), o.appendChild(d), z.forEach((b) => this.removeAttribute(b)), this.style.display = "block", this.appendChild(o);
  }
}
class de extends h {
  mount() {
    var u;
    const i = this.closest("eisma-accordion-item"), t = (i == null ? void 0 : i.getAttribute("data-value")) || "", s = this.closest("eisma-accordion"), e = ((u = s == null ? void 0 : s.firstElementChild) == null ? void 0 : u.getAttribute("data-type")) === "multiple", a = this.mergeClass(ne), n = JSON.stringify(t), o = document.createElement("div");
    o.id = `panel-${t}`, o.setAttribute("role", "region"), o.className = a;
    const d = e ? "isOpen" : `active === ${n}`;
    o.setAttribute("x-show", d), o.setAttribute("x-cloak", ""), o.setAttribute("style", "display: none"), this.moveChildren(o), this.style.display = "block", this.appendChild(o);
  }
}
const ce = "rounded-md text-xs p-4 overflow-x-auto " + g + " my-3 bg-neutral-50 dark:bg-neutral-900", ue = ["class", "language"];
class he extends h {
  mount() {
    const i = this.getAttribute("language") || "html", t = this.mergeClass(ce), s = (this.textContent || "").replace(/^\n/, "").replace(/\s+$/, "");
    for (; this.firstChild; ) this.removeChild(this.firstChild);
    const e = document.createElement("pre");
    e.className = t;
    const a = document.createElement("code");
    a.className = `language-${i}`, a.textContent = s, e.appendChild(a), ue.forEach((o) => this.removeAttribute(o)), this.style.display = "block", this.appendChild(e);
    const n = window.hljs;
    n && n.highlightElement(a);
  }
}
const me = "rounded-xl bg-white text-neutral-950 p-6 " + g + " dark:bg-neutral-950 dark:text-neutral-50";
class be extends h {
  mount() {
    const i = this.mergeClass(me), t = document.createElement("div");
    t.className = i, this.passThroughAttributes(t, ["class"]), this.moveChildren(t), this.style.display = "block", this.appendChild(t);
  }
}
const m = (r, i) => {
  typeof customElements > "u" || customElements.get(r) || customElements.define(r, i);
};
m("eisma-modal", tt);
m("eisma-dropdown", Tt);
m("eisma-tooltip", Jt);
m("eisma-callout", bt);
m("eisma-tabs", Zt);
m("eisma-tab-list", Qt);
m("eisma-tab-panel", ee);
m("eisma-accordion", re);
m("eisma-accordion-item", oe);
m("eisma-button", st);
m("eisma-dropdown-item", Lt);
m("eisma-dropdown-separator", Dt);
m("eisma-dropdown-label", Rt);
m("eisma-tab", te);
m("eisma-accordion-trigger", le);
m("eisma-accordion-content", de);
m("eisma-input", nt);
m("eisma-select", rt);
m("eisma-textarea", lt);
m("eisma-checkbox", At);
m("eisma-radio", Et);
m("eisma-switch", Kt);
m("eisma-badge", ct);
m("eisma-card", be);
m("eisma-icon", Bt);
m("eisma-theme-toggle", Pt);
m("eisma-code", he);
export {
  re as EismaAccordion,
  de as EismaAccordionContent,
  oe as EismaAccordionItem,
  le as EismaAccordionTrigger,
  ct as EismaBadge,
  st as EismaButton,
  bt as EismaCallout,
  be as EismaCard,
  At as EismaCheckbox,
  he as EismaCode,
  Tt as EismaDropdown,
  Lt as EismaDropdownItem,
  Rt as EismaDropdownLabel,
  Dt as EismaDropdownSeparator,
  Bt as EismaIcon,
  nt as EismaInput,
  tt as EismaModal,
  Et as EismaRadio,
  rt as EismaSelect,
  Kt as EismaSwitch,
  te as EismaTab,
  Qt as EismaTabList,
  ee as EismaTabPanel,
  Zt as EismaTabs,
  lt as EismaTextarea,
  Pt as EismaThemeToggle,
  Jt as EismaTooltip
};
//# sourceMappingURL=eisma.js.map
