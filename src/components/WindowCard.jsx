import React, { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ScrambleText from "./ScrambleText";
import { scan } from "../utils/motion";
import "./WindowCard.scss";

const WindowCard = forwardRef(function WindowCard(
  {
    path,
    tag,
    dotColor = "var(--accent)",
    className = "",
    scrambleTag = false,
    scanline = false,
    children,
    ...motionProps
  },
  ref
) {
  const reduce = useReducedMotion();

  return (
    <motion.div ref={ref} className={`window-card ${className}`} {...motionProps}>
      {scanline && !reduce && (
        <motion.span className="window-card__scan" aria-hidden="true" variants={scan} />
      )}
      <div className="window-card__bar">
        {/* color feeds the currentColor halo in the stylesheet, not just the fill */}
        <span
          className="window-card__dot"
          style={{ background: dotColor, color: dotColor }}
        />
        <span className="window-card__path mono">{path}</span>
        {tag &&
          (scrambleTag ? (
            <ScrambleText className="window-card__tag mono" text={String(tag)} once={false} />
          ) : (
            <span className="window-card__tag mono">{tag}</span>
          ))}
      </div>
      <div className="window-card__body">{children}</div>
    </motion.div>
  );
});

export default WindowCard;
