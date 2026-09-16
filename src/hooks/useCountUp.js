import { useEffect, useState } from "react";
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { steps } from "../utils/motion";

export const useCountUp = (target, { duration = 0.4, notches = 0 } = {}) => {
  const reduce = useReducedMotion();
  const mv = useMotionValue(target);
  const [display, setDisplay] = useState(target);

  useMotionValueEvent(mv, "change", (v) => {
    const rounded = Math.round(v);
    setDisplay((prev) => (prev === rounded ? prev : rounded));
  });

  useEffect(() => {
    if (reduce) {
      mv.set(target);
      setDisplay(target);
      return undefined;
    }
    const controls = animate(mv, target, {
      duration,
      ease: notches ? steps(notches) : "linear",
    });
    return () => controls.stop();
  }, [target, duration, notches, reduce, mv]);

  return display;
};
