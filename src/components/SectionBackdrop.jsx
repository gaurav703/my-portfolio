import React from "react";
import "./SectionBackdrop.scss";

// Decorative per-section background. Each variant is a different structure so
// sections don't all read as the same flat panel.
const SectionBackdrop = ({ variant }) => {
  if (!variant) return null;

  return (
    <div className={`backdrop backdrop--${variant}`} aria-hidden="true">
      {variant === "mesh" && (
        <>
          <span className="backdrop__morph backdrop__morph--a" />
          <span className="backdrop__morph backdrop__morph--b" />
        </>
      )}

      {variant === "beams" && (
        <>
          <span className="backdrop__lines" />
          {[12, 31, 54, 73, 90].map((left, i) => (
            <span
              key={left}
              className="backdrop__meteor"
              style={{ left: `${left}%`, animationDelay: `${i * 1.7}s` }}
            />
          ))}
          <span className="backdrop__beam" />
        </>
      )}

      {variant === "rings" && (
        <>
          <span className="backdrop__ring backdrop__ring--1" />
          <span className="backdrop__ring backdrop__ring--2" />
          <span className="backdrop__ring backdrop__ring--3" />
          <span className="backdrop__radar" />
        </>
      )}

      {variant === "grid" && (
        <>
          <span className="backdrop__floor" />
          <span className="backdrop__horizon" />
        </>
      )}

      {variant === "aurora" && (
        <>
          <span className="backdrop__wave backdrop__wave--1" />
          <span className="backdrop__wave backdrop__wave--2" />
          <span className="backdrop__wave backdrop__wave--3" />
        </>
      )}
    </div>
  );
};

export default SectionBackdrop;
