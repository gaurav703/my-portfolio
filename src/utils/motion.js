import { useReducedMotion } from "framer-motion";

export const EASE = {
  snap: [0.2, 0, 0, 1],
  out: [0.16, 1, 0.3, 1],
  lin: "linear",
};

// framer-motion 7 has no "steps" easing keyword, but `ease` accepts a function.
export const steps = (n) => (t) => Math.min(1, Math.floor(t * n) / (n - 1));

export const DUR = { instant: 0.001, xs: 0.18, sm: 0.28, md: 0.42, lg: 0.6 };
export const TRAVEL = { xs: 6, sm: 12, md: 20, lg: 26 };

export const VIEW = { once: true, amount: 0.25 };
export const VIEW_HEAD = { once: true, amount: 0.5 };

export const fadeUp = {
  hidden: { opacity: 0, y: TRAVEL.sm },
  show: { opacity: 1, y: 0, transition: { duration: DUR.md, ease: EASE.snap } },
};

export const gridIn = {
  hidden: { opacity: 0, y: TRAVEL.lg },
  show: { opacity: 1, y: 0, transition: { duration: DUR.sm, ease: EASE.snap } },
};

export const slideX = (from = -TRAVEL.md) => ({
  hidden: { opacity: 0, x: from },
  show: { opacity: 1, x: 0, transition: { duration: DUR.md, ease: EASE.snap } },
});

// Hard on/off with no fade — the boot-log primitive.
export const popOn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.instant } },
};

export const railX = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: DUR.md, ease: EASE.snap } },
};

// Reveals a dashed border without distorting the dash pattern the way pathLength would.
// Units must match slot-for-slot or framer-motion's complex-value parser mangles it.
export const clipInX = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: DUR.lg, ease: EASE.snap },
  },
};

export const lineUp = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: DUR.md, ease: EASE.out } },
};

export const cornerIn = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: { duration: DUR.xs, ease: steps(2) } },
};

const sweep = {
  x: "110%",
  opacity: [0, 1, 1, 0],
  transition: {
    x: { duration: 0.75, ease: EASE.lin },
    opacity: { duration: 0.75, times: [0, 0.08, 0.85, 1] },
  },
};

// `hover` mirrors `show` so the same span works under a card that reveals itself
// (Hero) and one that sweeps on hover (Projects).
export const scan = {
  hidden: { x: "-110%", opacity: 0 },
  show: sweep,
  hover: sweep,
};

export const parent = (stagger = 0.06, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

// Lets one element animate itself and stagger its children without a wrapper div.
export const withChildren = (v, stagger = 0.06, delay = 0) => ({
  hidden: v.hidden,
  show: {
    ...v.show,
    transition: { ...v.show.transition, staggerChildren: stagger, delayChildren: delay },
  },
});

// MotionConfig reducedMotion="user" does not collapse staggerChildren, so these must.
export const useParent = (stagger = 0.06, delay = 0) => {
  const reduce = useReducedMotion();
  return parent(reduce ? 0 : stagger, reduce ? 0 : delay);
};

export const useWithChildren = (v, stagger = 0.06, delay = 0) => {
  const reduce = useReducedMotion();
  return withChildren(v, reduce ? 0 : stagger, reduce ? 0 : delay);
};

export const reveal = (variants, viewport = VIEW) => ({
  variants,
  initial: "hidden",
  whileInView: "show",
  viewport,
});
