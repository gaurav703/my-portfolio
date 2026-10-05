import React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const SPRING = { stiffness: 200, damping: 20 };

// Tilts its child in 3D toward the cursor.
const Tilt = ({ max = 8, className = "", children }) => {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), SPRING);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), SPRING);

  if (reduce) return <div className={className}>{children}</div>;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className={className} style={{ perspective: 1000, height: "100%" }}>
      <motion.div
        style={{ rotateX, rotateY, height: "100%", transformStyle: "preserve-3d" }}
        onMouseMove={onMove}
        onMouseLeave={reset}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Tilt;
