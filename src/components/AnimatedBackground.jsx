import React, { useEffect, useRef } from "react";
import "./AnimatedBackground.scss";

const CARD_SELECTOR = ".window-card, .glass-card, .spotlight";

// Fixed, site-wide backdrop: two slow blue glows, a masked dot grid and a
// cursor-following glow. It also feeds --mx/--my to whichever card is under the pointer
// so the card spotlight works without a listener per card.
const AnimatedBackground = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const onMove = (e) => {
      const { clientX, clientY, target } = e;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.setProperty("--cx", `${clientX}px`);
          glowRef.current.style.setProperty("--cy", `${clientY}px`);
          glowRef.current.style.opacity = "1";
        }
        const card = target instanceof Element ? target.closest(CARD_SELECTOR) : null;
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${clientX - r.left}px`);
          card.style.setProperty("--my", `${clientY - r.top}px`);
        }
      });
    };

    const onLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="bg-layer" aria-hidden="true">
      <div className="bg-layer__blob bg-layer__blob--1" />
      <div className="bg-layer__blob bg-layer__blob--2" />
      <div className="bg-layer__grid" />
      <div className="bg-layer__glow" ref={glowRef} />
    </div>
  );
};

export default AnimatedBackground;
