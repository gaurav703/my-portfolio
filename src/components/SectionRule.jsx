import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { clipInX, cornerIn, useParent } from "../utils/motion";
import "./SectionRule.scss";

const SectionRule = () => {
  const reduce = useReducedMotion();
  const rule = useParent(0.09);

  // clipPath is not a transform, so MotionConfig reducedMotion="user" won't strip it.
  if (reduce) {
    return (
      <div className="section-rule" aria-hidden="true">
        <span className="section-rule__corner section-rule__corner--left" />
        <span className="section-rule__line" />
        <span className="section-rule__corner section-rule__corner--right" />
      </div>
    );
  }

  return (
    <motion.div
      className="section-rule"
      aria-hidden="true"
      variants={rule}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 1 }}
    >
      <motion.span
        className="section-rule__corner section-rule__corner--left"
        variants={cornerIn}
      />
      <motion.span className="section-rule__line" variants={clipInX} />
      <motion.span
        className="section-rule__corner section-rule__corner--right"
        variants={cornerIn}
      />
    </motion.div>
  );
};

export default SectionRule;
