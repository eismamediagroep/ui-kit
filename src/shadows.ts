// Inline shadow utility strings using Tailwind v4 arbitrary value syntax.
//
// Each constant is a stack of three box-shadows that together approximate a
// 1px "ring" border with optical depth:
//   1. inset 1px highlight at the top  (light: 65% white, dark: 6% white)
//   2. flat 1px ring around the box    (light: 6% black,  dark: 25% white)
//   3. soft outer drop shadow          (size depends on elevation tier)
//
// Underscores in the class string become spaces in the resolved CSS, and
// the `/_X` notation is the Tailwind arbitrary-value spelling of `/ X` for
// the alpha channel. We inline rather than define a theme variable so
// consumers don't need any @theme / @utility / CSS-var plumbing in their
// own setup — Tailwind sees these class names in the DOM and generates the
// matching rules automatically.

const TOP = 'inset_0_1px_0_rgb(255_255_255_/_0.65)';
const RING = '0_0_0_1px_rgb(0_0_0_/_0.06)';
const DROP_SM = '0_1px_2px_0_rgb(0_0_0_/_0.04)';
const DROP_MD = '0_4px_12px_0_rgb(0_0_0_/_0.08)';
const DROP_LG = '0_16px_40px_0_rgb(0_0_0_/_0.18)';

const TOP_DK = 'inset_0_1px_0_rgb(255_255_255_/_0.06)';
const RING_DK = '0_0_0_1px_rgb(255_255_255_/_0.25)';
const DROP_SM_DK = '0_1px_2px_0_rgb(0_0_0_/_0.4)';
const DROP_MD_DK = '0_4px_12px_0_rgb(0_0_0_/_0.5)';
const DROP_LG_DK = '0_16px_40px_0_rgb(0_0_0_/_0.6)';

/** Subtle: form fields, outline button, badge outline, card, callout, code. */
export const SHADOW_RING =
  `shadow-[${TOP},${RING},${DROP_SM}] ` +
  `dark:shadow-[${TOP_DK},${RING_DK},${DROP_SM_DK}]`;

/** Medium: dropdown menus. */
export const SHADOW_POPOVER =
  `shadow-[${TOP},${RING},${DROP_MD}] ` +
  `dark:shadow-[${TOP_DK},${RING_DK},${DROP_MD_DK}]`;

/** Heavy: modal panel. */
export const SHADOW_OVERLAY =
  `shadow-[${TOP},${RING},${DROP_LG}] ` +
  `dark:shadow-[${TOP_DK},${RING_DK},${DROP_LG_DK}]`;
