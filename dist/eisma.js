const lt = (e, r) => {
  const t = new Array(e.length + r.length);
  for (let s = 0; s < e.length; s++)
    t[s] = e[s];
  for (let s = 0; s < r.length; s++)
    t[e.length + s] = r[s];
  return t;
}, ct = (e, r) => ({
  classGroupId: e,
  validator: r
}), Ke = (e = /* @__PURE__ */ new Map(), r = null, t) => ({
  nextPart: e,
  validators: r,
  classGroupId: t
}), ee = "-", Ae = [], dt = "arbitrary..", ut = (e) => {
  const r = bt(e), {
    conflictingClassGroups: t,
    conflictingClassGroupModifiers: s
  } = e;
  return {
    getClassGroupId: (n) => {
      if (n.startsWith("[") && n.endsWith("]"))
        return mt(n);
      const a = n.split(ee), l = a[0] === "" && a.length > 1 ? 1 : 0;
      return Ye(a, l, r);
    },
    getConflictingClassGroupIds: (n, a) => {
      if (a) {
        const l = s[n], c = t[n];
        return l ? c ? lt(c, l) : l : c || Ae;
      }
      return t[n] || Ae;
    }
  };
}, Ye = (e, r, t) => {
  if (e.length - r === 0)
    return t.classGroupId;
  const o = e[r], i = t.nextPart.get(o);
  if (i) {
    const c = Ye(e, r + 1, i);
    if (c) return c;
  }
  const n = t.validators;
  if (n === null)
    return;
  const a = r === 0 ? e.join(ee) : e.slice(r).join(ee), l = n.length;
  for (let c = 0; c < l; c++) {
    const m = n[c];
    if (m.validator(a))
      return m.classGroupId;
  }
}, mt = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const r = e.slice(1, -1), t = r.indexOf(":"), s = r.slice(0, t);
  return s ? dt + s : void 0;
})(), bt = (e) => {
  const {
    theme: r,
    classGroups: t
  } = e;
  return pt(t, r);
}, pt = (e, r) => {
  const t = Ke();
  for (const s in e) {
    const o = e[s];
    ce(o, t, s, r);
  }
  return t;
}, ce = (e, r, t, s) => {
  const o = e.length;
  for (let i = 0; i < o; i++) {
    const n = e[i];
    ht(n, r, t, s);
  }
}, ht = (e, r, t, s) => {
  if (typeof e == "string") {
    gt(e, r, t);
    return;
  }
  if (typeof e == "function") {
    ft(e, r, t, s);
    return;
  }
  xt(e, r, t, s);
}, gt = (e, r, t) => {
  const s = e === "" ? r : He(r, e);
  s.classGroupId = t;
}, ft = (e, r, t, s) => {
  if (vt(e)) {
    ce(e(s), r, t, s);
    return;
  }
  r.validators === null && (r.validators = []), r.validators.push(ct(t, e));
}, xt = (e, r, t, s) => {
  const o = Object.entries(e), i = o.length;
  for (let n = 0; n < i; n++) {
    const [a, l] = o[n];
    ce(l, He(r, a), t, s);
  }
}, He = (e, r) => {
  let t = e;
  const s = r.split(ee), o = s.length;
  for (let i = 0; i < o; i++) {
    const n = s[i];
    let a = t.nextPart.get(n);
    a || (a = Ke(), t.nextPart.set(n, a)), t = a;
  }
  return t;
}, vt = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, kt = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, t = /* @__PURE__ */ Object.create(null), s = /* @__PURE__ */ Object.create(null);
  const o = (i, n) => {
    t[i] = n, r++, r > e && (r = 0, s = t, t = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(i) {
      let n = t[i];
      if (n !== void 0)
        return n;
      if ((n = s[i]) !== void 0)
        return o(i, n), n;
    },
    set(i, n) {
      i in t ? t[i] = n : o(i, n);
    }
  };
}, le = "!", Ce = ":", yt = [], Ee = (e, r, t, s, o) => ({
  modifiers: e,
  hasImportantModifier: r,
  baseClassName: t,
  maybePostfixModifierPosition: s,
  isExternal: o
}), wt = (e) => {
  const {
    prefix: r,
    experimentalParseClassName: t
  } = e;
  let s = (o) => {
    const i = [];
    let n = 0, a = 0, l = 0, c;
    const m = o.length;
    for (let E = 0; E < m; E++) {
      const N = o[E];
      if (n === 0 && a === 0) {
        if (N === Ce) {
          i.push(o.slice(l, E)), l = E + 1;
          continue;
        }
        if (N === "/") {
          c = E;
          continue;
        }
      }
      N === "[" ? n++ : N === "]" ? n-- : N === "(" ? a++ : N === ")" && a--;
    }
    const f = i.length === 0 ? o : o.slice(l);
    let h = f, k = !1;
    f.endsWith(le) ? (h = f.slice(0, -1), k = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      f.startsWith(le) && (h = f.slice(1), k = !0)
    );
    const T = c && c > l ? c - l : void 0;
    return Ee(i, k, h, T);
  };
  if (r) {
    const o = r + Ce, i = s;
    s = (n) => n.startsWith(o) ? i(n.slice(o.length)) : Ee(yt, !1, n, void 0, !0);
  }
  if (t) {
    const o = s;
    s = (i) => t({
      className: i,
      parseClassName: o
    });
  }
  return s;
}, At = (e) => {
  const r = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((t, s) => {
    r.set(t, 1e6 + s);
  }), (t) => {
    const s = [];
    let o = [];
    for (let i = 0; i < t.length; i++) {
      const n = t[i], a = n[0] === "[", l = r.has(n);
      a || l ? (o.length > 0 && (o.sort(), s.push(...o), o = []), s.push(n)) : o.push(n);
    }
    return o.length > 0 && (o.sort(), s.push(...o)), s;
  };
}, Ct = (e) => ({
  cache: kt(e.cacheSize),
  parseClassName: wt(e),
  sortModifiers: At(e),
  postfixLookupClassGroupIds: Et(e),
  ...ut(e)
}), Et = (e) => {
  const r = /* @__PURE__ */ Object.create(null), t = e.postfixLookupClassGroups;
  if (t)
    for (let s = 0; s < t.length; s++)
      r[t[s]] = !0;
  return r;
}, _t = /\s+/, St = (e, r) => {
  const {
    parseClassName: t,
    getClassGroupId: s,
    getConflictingClassGroupIds: o,
    sortModifiers: i,
    postfixLookupClassGroupIds: n
  } = r, a = [], l = e.trim().split(_t);
  let c = "";
  for (let m = l.length - 1; m >= 0; m -= 1) {
    const f = l[m], {
      isExternal: h,
      modifiers: k,
      hasImportantModifier: T,
      baseClassName: E,
      maybePostfixModifierPosition: N
    } = t(f);
    if (h) {
      c = f + (c.length > 0 ? " " + c : c);
      continue;
    }
    let D = !!N, _;
    if (D) {
      const L = E.substring(0, N);
      _ = s(L);
      const b = _ && n[_] ? s(E) : void 0;
      b && b !== _ && (_ = b, D = !1);
    } else
      _ = s(E);
    if (!_) {
      if (!D) {
        c = f + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (_ = s(E), !_) {
        c = f + (c.length > 0 ? " " + c : c);
        continue;
      }
      D = !1;
    }
    const F = k.length === 0 ? "" : k.length === 1 ? k[0] : i(k).join(":"), B = T ? F + le : F, U = B + _;
    if (a.indexOf(U) > -1)
      continue;
    a.push(U);
    const V = o(_, D);
    for (let L = 0; L < V.length; ++L) {
      const b = V[L];
      a.push(B + b);
    }
    c = f + (c.length > 0 ? " " + c : c);
  }
  return c;
}, Nt = (...e) => {
  let r = 0, t, s, o = "";
  for (; r < e.length; )
    (t = e[r++]) && (s = Xe(t)) && (o && (o += " "), o += s);
  return o;
}, Xe = (e) => {
  if (typeof e == "string")
    return e;
  let r, t = "";
  for (let s = 0; s < e.length; s++)
    e[s] && (r = Xe(e[s])) && (t && (t += " "), t += r);
  return t;
}, Ot = (e, ...r) => {
  let t, s, o, i;
  const n = (l) => {
    const c = r.reduce((m, f) => f(m), e());
    return t = Ct(c), s = t.cache.get, o = t.cache.set, i = a, a(l);
  }, a = (l) => {
    const c = s(l);
    if (c)
      return c;
    const m = St(l, t);
    return o(l, m), m;
  };
  return i = n, (...l) => i(Nt(...l));
}, $t = [], y = (e) => {
  const r = (t) => t[e] || $t;
  return r.isThemeGetter = !0, r;
}, Qe = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ze = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Tt = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Lt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, zt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, It = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Rt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Mt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, I = (e) => Tt.test(e), g = (e) => !!e && !Number.isNaN(Number(e)), $ = (e) => !!e && Number.isInteger(Number(e)), ie = (e) => e.endsWith("%") && g(e.slice(0, -1)), z = (e) => Lt.test(e), et = () => !0, Dt = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  zt.test(e) && !It.test(e)
), de = () => !1, Pt = (e) => Rt.test(e), Gt = (e) => Mt.test(e), jt = (e) => !d(e) && !u(e), Bt = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Ut = (e) => R(e, rt, de), d = (e) => Qe.test(e), G = (e) => R(e, ot, Dt), _e = (e) => R(e, Ht, g), Vt = (e) => R(e, it, et), Wt = (e) => R(e, nt, de), Se = (e) => R(e, tt, de), Ft = (e) => R(e, st, Gt), Q = (e) => R(e, at, Pt), u = (e) => Ze.test(e), J = (e) => j(e, ot), Jt = (e) => j(e, nt), Ne = (e) => j(e, tt), qt = (e) => j(e, rt), Kt = (e) => j(e, st), Z = (e) => j(e, at, !0), Yt = (e) => j(e, it, !0), R = (e, r, t) => {
  const s = Qe.exec(e);
  return s ? s[1] ? r(s[1]) : t(s[2]) : !1;
}, j = (e, r, t = !1) => {
  const s = Ze.exec(e);
  return s ? s[1] ? r(s[1]) : t : !1;
}, tt = (e) => e === "position" || e === "percentage", st = (e) => e === "image" || e === "url", rt = (e) => e === "length" || e === "size" || e === "bg-size", ot = (e) => e === "length", Ht = (e) => e === "number", nt = (e) => e === "family-name", it = (e) => e === "number" || e === "weight", at = (e) => e === "shadow", Xt = () => {
  const e = y("color"), r = y("font"), t = y("text"), s = y("font-weight"), o = y("tracking"), i = y("leading"), n = y("breakpoint"), a = y("container"), l = y("spacing"), c = y("radius"), m = y("shadow"), f = y("inset-shadow"), h = y("text-shadow"), k = y("drop-shadow"), T = y("blur"), E = y("perspective"), N = y("aspect"), D = y("ease"), _ = y("animate"), F = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], B = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], U = () => [...B(), u, d], V = () => ["auto", "hidden", "clip", "visible", "scroll"], L = () => ["auto", "contain", "none"], b = () => [u, d, l], S = () => [I, "full", "auto", ...b()], he = () => [$, "none", "subgrid", u, d], ge = () => ["auto", {
    span: ["full", $, u, d]
  }, $, u, d], q = () => [$, "auto", u, d], fe = () => ["auto", "min", "max", "fr", u, d], te = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], W = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], O = () => ["auto", ...b()], P = () => [I, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...b()], se = () => [I, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...b()], re = () => [I, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...b()], p = () => [e, u, d], xe = () => [...B(), Ne, Se, {
    position: [u, d]
  }], ve = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ke = () => ["auto", "cover", "contain", qt, Ut, {
    size: [u, d]
  }], oe = () => [ie, J, G], A = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    u,
    d
  ], C = () => ["", g, J, G], K = () => ["solid", "dashed", "dotted", "double"], ye = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], w = () => [g, ie, Ne, Se], we = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    T,
    u,
    d
  ], Y = () => ["none", g, u, d], H = () => ["none", g, u, d], ne = () => [g, u, d], X = () => [I, "full", ...b()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [z],
      breakpoint: [z],
      color: [et],
      container: [z],
      "drop-shadow": [z],
      ease: ["in", "out", "in-out"],
      font: [jt],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [z],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [z],
      shadow: [z],
      spacing: ["px", g],
      text: [z],
      "text-shadow": [z],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", I, d, u, N]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", u, d]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [Bt],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [g, d, u, a]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": F()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": F()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: U()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: V()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": V()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": V()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: L()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": L()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": L()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: S()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": S()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": S()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": S(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: S()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": S(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: S()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": S()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": S()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: S()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: S()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: S()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: S()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [$, "auto", u, d]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [I, "full", "auto", a, ...b()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [g, I, "auto", "initial", "none", d]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", g, u, d]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", g, u, d]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [$, "first", "last", "none", u, d]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": he()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ge()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": q()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": q()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": he()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ge()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": q()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": q()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": fe()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": fe()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: b()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": b()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": b()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...te(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...W(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...W()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...te()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...W(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...W(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": te()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...W(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...W()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: b()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: b()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: b()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: b()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: b()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: b()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: b()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: b()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: b()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: b()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: b()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: O()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: O()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: O()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: O()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: O()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: O()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: O()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: O()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: O()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: O()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: O()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": b()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": b()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: P()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...se()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...se()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...se()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...re()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...re()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...re()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [a, "screen", ...P()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          a,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...P()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          a,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [n]
          },
          ...P()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...P()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...P()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...P()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", t, J, G]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [s, Yt, Vt]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ie, d]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Jt, Wt, r]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [d]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [o, u, d]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [g, "none", u, _e]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
          ...b()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", u, d]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", u, d]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: p()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: p()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...K(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [g, "from-font", "auto", u, G]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: p()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [g, "auto", u, d]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: b()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [$, u, d]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", u, d]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", u, d]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: xe()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ve()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ke()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, $, u, d],
          radial: ["", u, d],
          conic: [$, u, d]
        }, Kt, Ft]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: p()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: oe()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: oe()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: oe()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: p()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: p()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: p()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: A()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": A()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": A()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": A()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": A()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": A()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": A()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": A()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": A()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": A()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": A()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": A()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": A()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": A()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": A()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: C()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": C()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": C()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": C()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": C()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": C()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": C()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": C()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": C()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": C()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": C()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": C()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": C()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...K(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...K(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: p()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": p()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": p()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": p()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": p()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": p()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": p()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": p()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": p()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": p()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": p()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: p()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...K(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [g, u, d]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", g, J, G]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: p()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          m,
          Z,
          Q
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: p()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", f, Z, Q]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": p()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: C()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: p()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [g, G]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": p()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": C()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": p()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", h, Z, Q]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": p()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [g, u, d]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ye(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ye()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [g]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": w()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": w()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": p()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": p()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": w()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": w()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": p()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": p()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": w()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": w()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": p()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": p()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": w()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": w()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": p()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": p()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": w()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": w()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": p()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": p()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": w()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": w()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": p()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": p()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": w()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": w()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": p()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": p()
      }],
      "mask-image-radial": [{
        "mask-radial": [u, d]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": w()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": w()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": p()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": p()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": B()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [g]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": w()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": w()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": p()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": p()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: xe()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: ve()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: ke()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", u, d]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          u,
          d
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: we()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [g, u, d]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [g, u, d]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          k,
          Z,
          Q
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": p()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", g, u, d]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [g, u, d]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", g, u, d]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [g, u, d]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", g, u, d]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          u,
          d
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": we()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [g, u, d]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [g, u, d]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", g, u, d]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [g, u, d]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", g, u, d]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [g, u, d]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [g, u, d]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", g, u, d]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": b()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": b()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": b()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", u, d]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [g, "initial", u, d]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", D, u, d]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [g, u, d]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", _, u, d]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [E, u, d]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": U()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: Y()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Y()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Y()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Y()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: H()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": H()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": H()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": H()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: ne()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ne()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ne()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [u, d, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: U()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: X()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": X()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": X()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": X()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [$, u, d]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: p()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: p()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", u, d]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": p()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": p()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": b()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": b()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": b()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": b()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": b()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": b()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": b()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": b()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": b()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": b()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": b()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": b()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": b()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": b()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": b()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": b()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": b()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": b()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": b()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": b()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": b()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": b()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", u, d]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...p()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [g, J, G, _e]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...p()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, Qt = /* @__PURE__ */ Ot(Xt);
class x extends HTMLElement {
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
   * Uses tailwind-merge so consumer utilities win on conflict (e.g. font-bold
   * replaces font-medium). Removes the host's `class` so styling lives on the
   * inner wrapper.
   */
  mergeClass(r) {
    const t = this.getAttribute("class") || "";
    return this.removeAttribute("class"), Qt(r, t);
  }
  /**
   * Move attributes from the host element to a target element, skipping
   * attributes the component consumes itself. Attributes are removed from
   * the host after copying so Alpine doesn't double-bind handlers (e.g.
   * `x-on:click` ending up on both the host and the inner button would fire
   * the handler twice per click).
   */
  passThroughAttributes(r, t) {
    const s = new Set(t);
    s.add("class");
    for (const o of Array.from(this.attributes))
      s.has(o.name) || (r.setAttribute(o.name, o.value), this.removeAttribute(o.name));
  }
  /** Move all child nodes of the host into `target`. */
  moveChildren(r) {
    for (; this.firstChild; ) r.appendChild(this.firstChild);
  }
}
const ue = "inset_0_1px_0_rgb(255_255_255_/_0.65)", me = "0_0_0_1px_rgb(0_0_0_/_0.06)", Zt = "0_1px_2px_0_rgb(0_0_0_/_0.04)", es = "0_4px_12px_0_rgb(0_0_0_/_0.08)", ts = "0_16px_40px_0_rgb(0_0_0_/_0.18)", be = "inset_0_1px_0_rgb(255_255_255_/_0.06)", pe = "0_0_0_1px_rgb(255_255_255_/_0.25)", ss = "0_1px_2px_0_rgb(0_0_0_/_0.4)", rs = "0_4px_12px_0_rgb(0_0_0_/_0.5)", os = "0_16px_40px_0_rgb(0_0_0_/_0.6)", M = `shadow-[${ue},${me},${Zt}] dark:shadow-[${be},${pe},${ss}]`, ns = `shadow-[${ue},${me},${es}] dark:shadow-[${be},${pe},${rs}]`, is = `shadow-[${ue},${me},${ts}] dark:shadow-[${be},${pe},${os}]`, as = "fixed inset-0 z-50 flex items-center justify-center p-4", ls = "absolute inset-0 bg-black/80 backdrop-blur-sm", cs = "relative w-full max-w-lg gap-4 rounded-lg p-6 " + is + " bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50", ds = [
  "class",
  "backdrop-class",
  "overlay-class",
  "close-on-escape",
  "close-on-backdrop",
  "aria-label",
  "aria-labelledby"
];
class us extends x {
  mount() {
    const r = this.id;
    r || console.warn("<eisma-modal> requires an `id` attribute so buttons can target it.");
    const t = this.mergeClass(cs), s = this.getAttribute("overlay-class") || as, o = this.getAttribute("backdrop-class") || ls, i = this.getAttribute("close-on-escape") !== "false", n = this.getAttribute("close-on-backdrop") !== "false", a = this.getAttribute("aria-labelledby"), l = this.getAttribute("aria-label");
    ds.forEach((k) => this.removeAttribute(k));
    const c = JSON.stringify(r), m = document.createElement("div");
    m.setAttribute("role", "dialog"), m.setAttribute("aria-modal", "true"), a ? m.setAttribute("aria-labelledby", a) : l && m.setAttribute("aria-label", l), m.setAttribute("tabindex", "-1"), m.setAttribute("x-data", "{ isOpen: false }"), m.setAttribute("x-show", "isOpen"), m.setAttribute("x-cloak", ""), m.setAttribute("x-transition.opacity", ""), m.setAttribute("x-trap.inert.noscroll", "isOpen"), m.setAttribute("style", "display: none"), m.setAttribute(
      "x-on:eisma-modal-toggle.window",
      `if ($event.detail.id === ${c}) isOpen = !isOpen`
    ), m.setAttribute(
      "x-on:eisma-modal-open.window",
      `if ($event.detail.id === ${c}) isOpen = true`
    ), m.setAttribute(
      "x-on:eisma-modal-close.window",
      `if ($event.detail.id === ${c}) isOpen = false`
    ), i && m.setAttribute("x-on:keydown.escape.window", "isOpen = false"), m.className = s;
    const f = document.createElement("div");
    f.className = o, n && f.setAttribute("x-on:click", "isOpen = false");
    const h = document.createElement("div");
    h.className = t, this.moveChildren(h), m.appendChild(f), m.appendChild(h), this.appendChild(m);
  }
}
const ms = "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300 disabled:pointer-events-none disabled:opacity-50", Oe = {
  default: "bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
  primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground shadow hover:bg-secondary/90",
  outline: "bg-white " + M + " hover:bg-neutral-100 hover:text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
  ghost: "hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
  destructive: "bg-red-600 text-neutral-50 shadow-sm hover:bg-red-600/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
  link: "text-primary underline-offset-4 hover:underline"
}, $e = {
  default: "h-9 rounded-md px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-lg px-8",
  icon: "h-9 w-9 rounded-md"
}, Te = [
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
class bs extends x {
  mount() {
    const r = this.getAttribute("modal"), t = this.hasAttribute("open") ? "open" : this.hasAttribute("close") ? "close" : "toggle", s = this.getAttribute("variant") || "default", o = this.getAttribute("size") || "default", i = this.getAttribute("icon-left"), n = this.getAttribute("icon-right"), a = this.getAttribute("icon-library") || "lucide", l = Oe[s] ?? Oe.default, c = $e[o] ?? $e.default, m = this.mergeClass(`${ms} ${l} ${c}`), f = this.getAttribute("href") || this.getAttribute(":href"), h = document.createElement(f ? "a" : "button");
    h.className = m, this.passThroughAttributes(h, Te), !f && !h.hasAttribute("type") && h.setAttribute("type", "button"), r && (h.setAttribute("x-data", ""), h.setAttribute(
      "x-on:click",
      `$dispatch('eisma-modal-${t}', { id: ${JSON.stringify(r)} })`
    )), i && h.appendChild(Le(i, a, o)), this.moveChildren(h), n && h.appendChild(Le(n, a, o)), Te.forEach((k) => this.removeAttribute(k)), this.appendChild(h);
  }
}
function Le(e, r, t) {
  const s = document.createElement("eisma-icon");
  return s.setAttribute("name", e), s.setAttribute("size", t === "lg" ? "18" : "16"), r !== "lucide" && s.setAttribute("library", r), s;
}
const ps = "flex h-9 w-full rounded-md bg-white px-3 pt-1 pb-1.5 text-sm transition-colors " + M + " text-neutral-950 placeholder:text-neutral-500 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:file:text-neutral-50 dark:focus-visible:ring-neutral-300", ze = ["class", "icon-left", "icon-right"];
class hs extends x {
  mount() {
    const r = this.getAttribute("icon-left"), t = this.getAttribute("icon-right");
    let s = ps;
    r && (s += " pl-8"), t && (s += " pr-8");
    const o = this.mergeClass(s), i = document.createElement("input");
    if (i.className = o, this.passThroughAttributes(i, ze), i.hasAttribute("type") || i.setAttribute("type", "text"), ze.forEach((a) => this.removeAttribute(a)), this.style.display = "block", !r && !t) {
      this.appendChild(i);
      return;
    }
    const n = document.createElement("div");
    n.className = "grid w-full grid-cols-1 grid-rows-1 items-center", i.style.gridArea = "1 / 1", r && n.appendChild(Ie(r, "left")), n.appendChild(i), t && n.appendChild(Ie(t, "right")), this.appendChild(n);
  }
}
function Ie(e, r) {
  const t = document.createElement("eisma-icon");
  return t.setAttribute("name", e), t.setAttribute("size", "16"), t.setAttribute("class", "text-neutral-500 dark:text-neutral-400"), t.style.gridArea = "1 / 1", t.style.alignSelf = "center", t.style.justifySelf = r === "left" ? "start" : "end", t.style[r === "left" ? "marginLeft" : "marginRight"] = ".65rem", t.style.transform = "translateY(-1px)", t.style.zIndex = "10", t.style.pointerEvents = "none", t;
}
const gs = "block h-9 w-full rounded-md bg-white appearance-none px-3 py-1 pr-9 text-sm " + M + " transition-colors text-neutral-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-950 dark:text-neutral-50 dark:focus-visible:ring-neutral-300";
class fs extends x {
  mount() {
    const r = this.mergeClass(gs), t = document.createElement("select");
    t.className = r, this.passThroughAttributes(t, []), this.moveChildren(t);
    const s = document.createElement("div");
    s.className = "grid w-full grid-cols-1 grid-rows-1 items-center", t.style.gridArea = "1 / 1", s.appendChild(t);
    const o = document.createElement("eisma-icon");
    o.setAttribute("name", "chevron-down"), o.setAttribute("size", "16"), o.setAttribute("class", "text-neutral-500 dark:text-neutral-400"), o.style.gridArea = "1 / 1", o.style.alignSelf = "center", o.style.justifySelf = "end", o.style.marginRight = "0.75rem", o.style.zIndex = "10", o.style.pointerEvents = "none", s.appendChild(o), this.style.display = "block", this.appendChild(s);
  }
}
const xs = "flex min-h-[60px] w-full rounded-md bg-white px-3 py-2 text-sm " + M + " transition-colors text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300";
class vs extends x {
  mount() {
    const r = this.mergeClass(xs), t = (this.textContent || "").replace(/^\s+|\s+$/g, "");
    for (; this.firstChild; ) this.removeChild(this.firstChild);
    const s = document.createElement("textarea");
    s.className = r, this.passThroughAttributes(s, []), t && (s.value = t), this.style.display = "block", this.appendChild(s);
  }
}
const ks = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:focus:ring-neutral-300", Re = {
  default: "border-transparent bg-neutral-900 text-neutral-50 hover:bg-neutral-900/80 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/80",
  secondary: "border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
  destructive: "border-transparent bg-red-600 text-neutral-50 hover:bg-red-600/80 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/80",
  outline: "text-neutral-950 border-transparent " + M + " dark:text-neutral-50"
}, Me = ["class", "variant"];
class ys extends x {
  mount() {
    const r = this.getAttribute("variant") || "default", t = Re[r] ?? Re.default, s = this.mergeClass(`${ks} ${t}`), o = document.createElement("span");
    o.className = s, this.passThroughAttributes(o, Me), this.moveChildren(o), Me.forEach((i) => this.removeAttribute(i)), this.appendChild(o);
  }
}
const ws = "relative w-full rounded-lg p-4 [&>svg+div]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4", De = {
  default: "bg-white text-neutral-950 " + M + " [&>svg]:text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50 dark:[&>svg]:text-neutral-50",
  info: "bg-blue-50 text-blue-900 border border-blue-200 [&>svg]:text-blue-600 dark:bg-blue-950/40 dark:text-blue-100 dark:border-blue-900 dark:[&>svg]:text-blue-400",
  warning: "bg-amber-50 text-amber-900 border border-amber-200 [&>svg]:text-amber-600 dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-900 dark:[&>svg]:text-amber-400",
  destructive: "bg-red-50 text-red-900 border border-red-200 [&>svg]:text-red-600 dark:bg-red-950/40 dark:text-red-100 dark:border-red-900 dark:[&>svg]:text-red-400"
}, As = "mb-1 font-medium leading-none tracking-tight", Cs = "text-sm [&_p]:leading-relaxed", Pe = ["class", "variant", "title"];
class Es extends x {
  mount() {
    const r = this.getAttribute("variant") || "default", t = this.getAttribute("title"), s = De[r] ?? De.default, o = this.mergeClass(`${ws} ${s}`), i = Array.from(this.childNodes), n = document.createElement("div");
    n.setAttribute("role", "alert"), n.className = o, this.passThroughAttributes(n, Pe);
    let a = null;
    const l = i.find((m) => m.nodeType === Node.ELEMENT_NODE);
    if (l && (l.tagName === "SVG" || l.tagName === "EISMA-ICON") && (a = l, i.splice(i.indexOf(l), 1)), a && n.appendChild(a), t) {
      const m = document.createElement("h5");
      m.className = As, m.textContent = t, n.appendChild(m);
    }
    const c = document.createElement("div");
    c.className = Cs, i.forEach((m) => c.appendChild(m)), n.appendChild(c), Pe.forEach((m) => this.removeAttribute(m)), this.style.display = "block", this.appendChild(n);
  }
}
const _s = "h-4 w-4 shrink-0 rounded-sm border border-neutral-300 text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 dark:focus-visible:ring-neutral-300", Ss = "inline-flex items-center gap-2 text-sm font-medium leading-none text-neutral-950 dark:text-neutral-50 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-70", Ns = ["class"], Os = /* @__PURE__ */ new Set([
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
class $s extends x {
  mount() {
    const r = this.mergeClass(Ss), t = document.createElement("label");
    t.className = r;
    const s = document.createElement("input");
    s.type = "checkbox", s.className = _s;
    for (const o of Array.from(this.attributes))
      (Os.has(o.name) || o.name.startsWith("data-")) && s.setAttribute(o.name, o.value);
    if (t.appendChild(s), this.childNodes.length) {
      const o = document.createElement("span");
      this.moveChildren(o), t.appendChild(o);
    }
    Ns.forEach((o) => this.removeAttribute(o)), this.appendChild(t);
  }
}
const Ts = "h-4 w-4 shrink-0 rounded-full border border-neutral-300 text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 dark:focus-visible:ring-neutral-300", Ls = "inline-flex items-center gap-2 text-sm font-medium leading-none text-neutral-950 dark:text-neutral-50 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-70", zs = /* @__PURE__ */ new Set([
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
class Is extends x {
  mount() {
    const r = this.mergeClass(Ls), t = document.createElement("label");
    t.className = r;
    const s = document.createElement("input");
    s.type = "radio", s.className = Ts;
    for (const o of Array.from(this.attributes))
      (zs.has(o.name) || o.name.startsWith("data-")) && s.setAttribute(o.name, o.value);
    if (t.appendChild(s), this.childNodes.length) {
      const o = document.createElement("span");
      this.moveChildren(o), t.appendChild(o);
    }
    this.appendChild(t);
  }
}
const Rs = "absolute z-50 min-w-[8rem] overflow-hidden rounded-md p-1 " + ns + " bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50", Ms = "relative inline-block", Ds = "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors text-left hover:bg-neutral-100 hover:text-neutral-900 focus-visible:bg-neutral-100 focus-visible:text-neutral-900 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus-visible:bg-neutral-800 dark:focus-visible:text-neutral-50", Ps = "text-red-600 hover:text-red-600 focus-visible:text-red-600 hover:bg-red-100 focus-visible:bg-red-100 dark:text-red-400 dark:hover:bg-red-950 dark:focus-visible:bg-red-950", Gs = "-mx-1 my-1 h-px bg-neutral-200 dark:bg-neutral-800", js = "px-2 py-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400", Bs = `{
  isOpen: false,
  pos: 'bottom',
  toggle() { if (!this.isOpen) this.measure(); this.isOpen = !this.isOpen; },
  measure() {
    const r = this.$el.getBoundingClientRect();
    const below = window.innerHeight - r.bottom;
    this.pos = (below < 240 && r.top > below) ? 'top' : 'bottom';
  }
}`;
class Us extends x {
  mount() {
    const r = this.getAttribute("align") === "end", t = this.getAttribute("menu-class") || "", s = this.mergeClass(Ms);
    this.removeAttribute("menu-class"), this.removeAttribute("align");
    const o = Array.from(this.childNodes), n = o.filter(
      (f) => f.nodeType === Node.ELEMENT_NODE
    )[0] ?? null, a = n ? o.filter((f) => f !== n) : o;
    for (; this.firstChild; ) this.removeChild(this.firstChild);
    n && (n.setAttribute("aria-haspopup", "menu"), n.setAttribute("x-bind:aria-expanded", "isOpen"));
    const l = document.createElement("div");
    l.setAttribute("x-data", Bs), l.setAttribute("x-on:keydown.escape.window", "isOpen = false"), l.setAttribute("x-on:eisma-dropdown-close", "isOpen = false"), l.setAttribute("x-on:click.outside", "isOpen = false"), l.className = s;
    const c = document.createElement("div");
    c.setAttribute("x-on:click", "toggle()"), c.className = "inline-block", n && c.appendChild(n);
    const m = document.createElement("div");
    m.setAttribute("x-show", "isOpen"), m.setAttribute("x-cloak", ""), m.setAttribute("x-transition.opacity.duration.100ms", ""), m.setAttribute("role", "menu"), m.setAttribute("style", "display: none"), m.setAttribute(
      "x-bind:class",
      `{
        'top-full mt-2': pos === 'bottom',
        'bottom-full mb-2': pos === 'top',
        '${r ? "right-0" : "left-0"}': true
      }`
    ), m.className = [Rs, t].filter(Boolean).join(" ").trim(), a.forEach((f) => m.appendChild(f)), l.appendChild(c), l.appendChild(m), this.appendChild(l);
  }
}
const Ge = ["class", "destructive", "x-on:click", "@click"];
class Vs extends x {
  mount() {
    const r = this.getAttribute("href"), t = this.hasAttribute("destructive"), s = this.getAttribute("x-on:click") || this.getAttribute("@click") || "", o = this.mergeClass(
      `${Ds}${t ? " " + Ps : ""}`
    ), i = document.createElement(r ? "a" : "button");
    i.className = o, r || (i.type = "button"), i.setAttribute("role", "menuitem"), this.passThroughAttributes(i, Ge);
    const n = "$dispatch('eisma-dropdown-close')";
    i.setAttribute(
      "x-on:click",
      s ? `${s}; ${n}` : n
    ), this.moveChildren(i), Ge.forEach((a) => this.removeAttribute(a)), this.appendChild(i);
  }
}
class Ws extends x {
  mount() {
    const r = this.mergeClass(Gs), t = document.createElement("div");
    t.setAttribute("role", "separator"), t.className = r, this.appendChild(t);
  }
}
class Fs extends x {
  mount() {
    const r = this.mergeClass(js), t = document.createElement("div");
    t.className = r, this.moveChildren(t), this.appendChild(t);
  }
}
const je = {
  lucide: (e) => `https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/${e}.svg`,
  heroicons: (e) => `https://cdn.jsdelivr.net/npm/heroicons@latest/24/outline/${e}.svg`,
  "heroicons-solid": (e) => `https://cdn.jsdelivr.net/npm/heroicons@latest/24/solid/${e}.svg`,
  "heroicons-mini": (e) => `https://cdn.jsdelivr.net/npm/heroicons@latest/20/solid/${e}.svg`,
  "fa-brands": (e) => `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/svgs/brands/${e}.svg`,
  "fa-solid": (e) => `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/svgs/solid/${e}.svg`,
  "fa-regular": (e) => `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/svgs/regular/${e}.svg`
}, ae = /* @__PURE__ */ new Map();
function Be(e) {
  const r = ae.get(e);
  if (r) return r;
  const t = fetch(e).then((s) => {
    if (!s.ok) throw new Error(`eisma-icon: ${s.status} fetching ${e}`);
    return s.text();
  });
  return ae.set(e, t), t.catch(() => ae.delete(e)), t;
}
const Js = "block shrink-0", qs = ["class", "name", "library", "size", "src"];
class Ks extends x {
  mount() {
    const r = this.getAttribute("name"), t = this.getAttribute("src"), s = this.getAttribute("library") || "lucide", o = this.getAttribute("size") || "16", i = this.mergeClass(Js), n = /^\d+(\.\d+)?$/.test(o) ? `${o}px` : o;
    if (this.style.display = "inline-flex", this.style.alignItems = "center", this.style.justifyContent = "center", this.style.width = n, this.style.height = n, qs.forEach((l) => this.removeAttribute(l)), t) {
      Be(t).then((l) => Ue(this, l, o, i, null)).catch((l) => console.warn(l));
      return;
    }
    if (r) {
      const l = (je[s] ?? je.lucide)(r);
      Be(l).then((c) => Ue(this, c, o, i, s)).catch((c) => console.warn(c));
      return;
    }
    const a = this.querySelector("svg");
    if (a) {
      a.setAttribute("width", o), a.setAttribute("height", o), a.setAttribute("class", i), a.hasAttribute("aria-hidden") || a.setAttribute("aria-hidden", "true");
      return;
    }
    console.warn("<eisma-icon> requires a `name`, `src`, or an inline <svg> child.");
  }
}
function Ue(e, r, t, s, o) {
  const i = document.createElement("template");
  i.innerHTML = r.trim();
  const n = i.content.querySelector("svg");
  n && (n.querySelectorAll("script").forEach((a) => a.remove()), n.setAttribute("width", t), n.setAttribute("height", t), n.setAttribute("aria-hidden", "true"), n.setAttribute("class", s), (o === "fa-brands" || o === "fa-solid" || o === "fa-regular") && n.setAttribute("fill", "currentColor"), e.appendChild(n));
}
const Ys = "inline-flex items-center justify-center h-9 w-9 rounded-md border bg-white text-neutral-950 shadow-sm transition-colors border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:ring-neutral-300", Ve = ["class", "storage-key", "light-icon", "dark-icon"];
class Hs extends x {
  mount() {
    const r = this.getAttribute("storage-key") || "eisma-theme", t = this.getAttribute("light-icon") || "sun", s = this.getAttribute("dark-icon") || "moon", o = this.mergeClass(Ys), i = JSON.stringify(r), n = document.createElement("button");
    n.type = "button", n.className = o, n.setAttribute("aria-label", "Toggle theme"), this.passThroughAttributes(n, Ve), n.setAttribute(
      "x-data",
      `{
        dark: (() => {
          const stored = localStorage.getItem(${i});
          if (stored === 'dark') return true;
          if (stored === 'light') return false;
          return window.matchMedia('(prefers-color-scheme: dark)').matches;
        })(),
        apply() { document.documentElement.classList.toggle('dark', this.dark); },
        toggle() {
          this.dark = !this.dark;
          localStorage.setItem(${i}, this.dark ? 'dark' : 'light');
          this.apply();
        }
      }`
    ), n.setAttribute("x-init", "apply()"), n.setAttribute("x-on:click", "toggle()"), n.setAttribute("x-bind:aria-pressed", "dark");
    const a = document.createElement("eisma-icon");
    a.setAttribute("name", t), a.setAttribute("x-show", "!dark");
    const l = document.createElement("eisma-icon");
    l.setAttribute("name", s), l.setAttribute("x-show", "dark"), n.appendChild(a), n.appendChild(l), Ve.forEach((c) => this.removeAttribute(c)), this.appendChild(n);
  }
}
const Xs = "absolute z-50 pointer-events-none rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shadow-md bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900", We = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2"
};
let Qs = 0;
class Zs extends x {
  mount() {
    const r = this.getAttribute("text") || "", t = this.getAttribute("side") || "top", s = this.getAttribute("trigger") || "hover", o = We[t] ?? We.top, i = this.mergeClass("");
    r || console.warn("<eisma-tooltip> requires a `text` attribute.");
    const n = `eisma-tooltip-${++Qs}`, a = this.id || "", l = JSON.stringify(a), c = JSON.stringify(r), m = Array.from(this.childNodes), f = m.find(
      (T) => T.nodeType === Node.ELEMENT_NODE
    );
    for (f && f.setAttribute("aria-describedby", n); this.firstChild; ) this.removeChild(this.firstChild);
    const h = document.createElement("span");
    h.setAttribute(
      "x-data",
      `{ isOpen: false, text: ${c}, original: ${c} }`
    ), h.className = "relative inline-block", s === "click" ? (h.setAttribute("x-on:click", "isOpen = !isOpen"), h.setAttribute("x-on:click.outside", "isOpen = false"), h.setAttribute("x-on:keydown.escape.window", "isOpen = false")) : s !== "manual" && (h.setAttribute("x-on:mouseenter", "isOpen = true"), h.setAttribute("x-on:mouseleave", "isOpen = false"), h.setAttribute("x-on:focusin", "isOpen = true"), h.setAttribute("x-on:focusout", "isOpen = false")), a && (h.setAttribute(
      "x-on:eisma-tooltip-show.window",
      `if ($event.detail.id === ${l}) {
          if ($event.detail.text) text = $event.detail.text;
          isOpen = true;
        }`
    ), h.setAttribute(
      "x-on:eisma-tooltip-hide.window",
      `if ($event.detail.id === ${l}) isOpen = false`
    ), h.setAttribute(
      "x-on:eisma-tooltip-toggle.window",
      `if ($event.detail.id === ${l}) {
          if ($event.detail.text) text = $event.detail.text;
          isOpen = !isOpen;
        }`
    ), h.setAttribute(
      "x-on:eisma-tooltip-flash.window",
      `if ($event.detail.id === ${l}) {
          if ($event.detail.text) text = $event.detail.text;
          isOpen = true;
          if ($el._tipFlash) clearTimeout($el._tipFlash);
          $el._tipFlash = setTimeout(() => {
            isOpen = false;
            text = original;
          }, $event.detail.duration || 1500);
        }`
    )), m.forEach((T) => h.appendChild(T));
    const k = document.createElement("div");
    k.id = n, k.setAttribute("role", "tooltip"), k.setAttribute("x-show", "isOpen"), k.setAttribute("x-text", "text"), k.setAttribute("x-cloak", ""), k.setAttribute("style", "display: none"), k.className = [Xs, o, i].filter(Boolean).join(" "), h.appendChild(k), this.appendChild(h);
  }
}
const er = "relative inline-flex items-center gap-3 text-sm font-medium leading-none text-neutral-950 dark:text-neutral-50 cursor-pointer has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-70", tr = "inline-block h-5 w-9 shrink-0 rounded-full transition-colors bg-neutral-200 peer-checked:bg-neutral-900 dark:bg-neutral-800 dark:peer-checked:bg-neutral-50 peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-950 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-neutral-300 dark:peer-focus-visible:ring-offset-neutral-950", sr = "pointer-events-none absolute h-4 w-4 rounded-full shadow transition-transform left-0.5 top-1/2 -translate-y-1/2 peer-checked:translate-x-4 bg-white dark:bg-neutral-950", rr = /* @__PURE__ */ new Set([
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
class or extends x {
  mount() {
    const r = this.mergeClass(er), t = document.createElement("label");
    t.className = r;
    const s = document.createElement("input");
    s.type = "checkbox", s.setAttribute("role", "switch"), s.className = "peer sr-only";
    for (const n of Array.from(this.attributes))
      (rr.has(n.name) || n.name.startsWith("data-")) && (s.setAttribute(n.name, n.value), this.removeAttribute(n.name));
    const o = document.createElement("span");
    o.className = tr;
    const i = document.createElement("span");
    if (i.className = sr, t.appendChild(s), t.appendChild(o), t.appendChild(i), this.childNodes.length) {
      const n = document.createElement("span");
      this.moveChildren(n), t.appendChild(n);
    }
    this.appendChild(t);
  }
}
const nr = "inline-flex h-9 items-center justify-center rounded-lg p-1 bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400", ir = "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-300", ar = "bg-white text-neutral-950 shadow dark:bg-neutral-950 dark:text-neutral-50", lr = "mt-2 focus-visible:outline-none";
class cr extends x {
  mount() {
    const r = this.getAttribute("default") || "", t = this.mergeClass("w-full"), s = document.createElement("div");
    s.setAttribute("x-data", `{ active: ${JSON.stringify(r)} }`), s.className = t, this.moveChildren(s), this.removeAttribute("default"), this.style.display = "block", this.appendChild(s);
  }
}
class dr extends x {
  mount() {
    const r = this.mergeClass(nr), t = document.createElement("div");
    t.setAttribute("role", "tablist"), t.className = r, this.moveChildren(t), this.appendChild(t);
  }
}
const Fe = ["class", "value"];
class ur extends x {
  mount() {
    const r = this.getAttribute("value") || "", t = JSON.stringify(r), s = this.mergeClass(ir), o = document.createElement("button");
    o.type = "button", o.setAttribute("role", "tab"), o.className = s, this.passThroughAttributes(o, Fe), o.setAttribute("x-on:click", `active = ${t}`), o.setAttribute("x-bind:aria-selected", `active === ${t}`), o.setAttribute(
      "x-bind:class",
      `active === ${t} ? ${JSON.stringify(ar)} : ''`
    ), o.setAttribute("x-bind:tabindex", `active === ${t} ? 0 : -1`), this.moveChildren(o), Fe.forEach((i) => this.removeAttribute(i)), this.appendChild(o);
  }
}
const Je = ["class", "value"];
class mr extends x {
  mount() {
    const r = this.getAttribute("value") || "", t = JSON.stringify(r), s = this.mergeClass(lr), o = document.createElement("div");
    o.setAttribute("role", "tabpanel"), o.setAttribute("tabindex", "0"), o.className = s, o.setAttribute("x-show", `active === ${t}`), o.setAttribute("x-cloak", ""), o.setAttribute("style", "display: none"), this.passThroughAttributes(o, Je), this.moveChildren(o), Je.forEach((i) => this.removeAttribute(i)), this.style.display = "block", this.appendChild(o);
  }
}
const br = "border-b border-neutral-200 dark:border-neutral-800", pr = "flex w-full flex-1 items-center justify-between py-4 text-sm font-medium transition-all text-left cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300", hr = "pb-4 pt-0 text-sm text-neutral-700 dark:text-neutral-300";
let gr = 0;
class fr extends x {
  mount() {
    const r = this.getAttribute("type") === "multiple", t = this.mergeClass("w-full"), s = document.createElement("div");
    s.setAttribute(
      "x-data",
      r ? "{}" : "{ active: null }"
    ), s.setAttribute("data-type", r ? "multiple" : "single"), s.className = t, this.moveChildren(s), this.removeAttribute("type"), this.style.display = "block", this.appendChild(s);
  }
}
class xr extends x {
  mount() {
    var n;
    const r = this.getAttribute("value") || `eisma-accordion-item-${++gr}`, t = this.mergeClass(br);
    this.setAttribute("data-value", r), this.removeAttribute("value");
    const s = this.closest("eisma-accordion"), o = ((n = s == null ? void 0 : s.firstElementChild) == null ? void 0 : n.getAttribute("data-type")) === "multiple", i = document.createElement("div");
    i.className = t, o && i.setAttribute("x-data", "{ isOpen: false }"), i.setAttribute("data-value", r), this.moveChildren(i), this.style.display = "block", this.appendChild(i);
  }
}
const qe = ["class"];
class vr extends x {
  mount() {
    var m;
    const r = this.closest("eisma-accordion-item"), t = (r == null ? void 0 : r.getAttribute("data-value")) || "", s = this.closest("eisma-accordion"), o = ((m = s == null ? void 0 : s.firstElementChild) == null ? void 0 : m.getAttribute("data-type")) === "multiple", i = this.mergeClass(pr), n = JSON.stringify(t), a = document.createElement("button");
    a.type = "button", a.className = i, a.setAttribute("aria-controls", `panel-${t}`), o ? (a.setAttribute("x-on:click", "isOpen = !isOpen"), a.setAttribute("x-bind:aria-expanded", "isOpen")) : (a.setAttribute(
      "x-on:click",
      `active = active === ${n} ? null : ${n}`
    ), a.setAttribute("x-bind:aria-expanded", `active === ${n}`)), this.passThroughAttributes(a, qe), this.moveChildren(a);
    const l = document.createElement("eisma-icon");
    l.setAttribute("name", "chevron-down"), l.setAttribute("size", "16");
    const c = o ? "isOpen" : `active === ${n}`;
    l.setAttribute(
      "x-bind:class",
      `${c} ? 'rotate-180 transition-transform shrink-0' : 'transition-transform shrink-0'`
    ), a.appendChild(l), qe.forEach((f) => this.removeAttribute(f)), this.style.display = "block", this.appendChild(a);
  }
}
class kr extends x {
  mount() {
    var c;
    const r = this.closest("eisma-accordion-item"), t = (r == null ? void 0 : r.getAttribute("data-value")) || "", s = this.closest("eisma-accordion"), o = ((c = s == null ? void 0 : s.firstElementChild) == null ? void 0 : c.getAttribute("data-type")) === "multiple", i = this.mergeClass(hr), n = JSON.stringify(t), a = document.createElement("div");
    a.id = `panel-${t}`, a.setAttribute("role", "region"), a.className = i;
    const l = o ? "isOpen" : `active === ${n}`;
    a.setAttribute("x-show", l), a.setAttribute("x-cloak", ""), a.setAttribute("style", "display: none"), this.moveChildren(a), this.style.display = "block", this.appendChild(a);
  }
}
const yr = "rounded-md text-xs p-4 overflow-x-auto " + M + " my-3 bg-neutral-50 dark:bg-neutral-900", wr = ["class", "language"];
class Ar extends x {
  mount() {
    const r = this.getAttribute("language") || "html", t = this.mergeClass(yr), s = (this.textContent || "").replace(/^\n/, "").replace(/\s+$/, "");
    for (; this.firstChild; ) this.removeChild(this.firstChild);
    const o = document.createElement("pre");
    o.className = t;
    const i = document.createElement("code");
    i.className = `language-${r}`, i.textContent = s, o.appendChild(i), wr.forEach((a) => this.removeAttribute(a)), this.style.display = "block", this.appendChild(o);
    const n = window.hljs;
    n && n.highlightElement(i);
  }
}
const Cr = "rounded-xl bg-white text-neutral-950 p-6 " + M + " dark:bg-neutral-950 dark:text-neutral-50";
class Er extends x {
  mount() {
    const r = this.mergeClass(Cr), t = document.createElement("div");
    t.className = r, this.passThroughAttributes(t, ["class"]), this.moveChildren(t), this.style.display = "block", this.appendChild(t);
  }
}
const v = (e, r) => {
  typeof customElements > "u" || customElements.get(e) || customElements.define(e, r);
};
v("eisma-modal", us);
v("eisma-dropdown", Us);
v("eisma-tooltip", Zs);
v("eisma-callout", Es);
v("eisma-tabs", cr);
v("eisma-tab-list", dr);
v("eisma-tab-panel", mr);
v("eisma-accordion", fr);
v("eisma-accordion-item", xr);
v("eisma-button", bs);
v("eisma-dropdown-item", Vs);
v("eisma-dropdown-separator", Ws);
v("eisma-dropdown-label", Fs);
v("eisma-tab", ur);
v("eisma-accordion-trigger", vr);
v("eisma-accordion-content", kr);
v("eisma-input", hs);
v("eisma-select", fs);
v("eisma-textarea", vs);
v("eisma-checkbox", $s);
v("eisma-radio", Is);
v("eisma-switch", or);
v("eisma-badge", ys);
v("eisma-card", Er);
v("eisma-icon", Ks);
v("eisma-theme-toggle", Hs);
v("eisma-code", Ar);
export {
  fr as EismaAccordion,
  kr as EismaAccordionContent,
  xr as EismaAccordionItem,
  vr as EismaAccordionTrigger,
  ys as EismaBadge,
  bs as EismaButton,
  Es as EismaCallout,
  Er as EismaCard,
  $s as EismaCheckbox,
  Ar as EismaCode,
  Us as EismaDropdown,
  Vs as EismaDropdownItem,
  Fs as EismaDropdownLabel,
  Ws as EismaDropdownSeparator,
  Ks as EismaIcon,
  hs as EismaInput,
  us as EismaModal,
  Is as EismaRadio,
  fs as EismaSelect,
  or as EismaSwitch,
  ur as EismaTab,
  dr as EismaTabList,
  mr as EismaTabPanel,
  cr as EismaTabs,
  vs as EismaTextarea,
  Hs as EismaThemeToggle,
  Zs as EismaTooltip
};
//# sourceMappingURL=eisma.js.map
