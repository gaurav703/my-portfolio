import React, { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const SPRING = { stiffness: 220, damping: 15, mass: 0.4 };

// Wraps a link/button so it leans toward the cursor while hovered.
const Magnetic = ({ as = "a", strength = 0.35, children, ...props }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);
  const Comp = motion[as];

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Comp ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={reset} {...props}>
      {children}
    </Comp>
  );
};

export default Magnetic;
