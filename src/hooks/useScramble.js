import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|<>[]{}#$%*+=-_";

// Always returns a string of text.length chars, so a mono font never reflows mid-decode.
const scramble = (text, revealed) => {
  let out = text.slice(0, revealed);
  for (let i = revealed; i < text.length; i++) {
    const char = text[i];
    out += char === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
  }
  return out;
};

export const useScramble = (text, { active = true, tick = 30, perTick = 1 } = {}) => {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(() =>
    active && !reduce ? scramble(text, 0) : text
  );
  const raf = useRef(0);

  useEffect(() => {
    if (!active || reduce) {
      setOut(text);
      return undefined;
    }

    let revealed = 0;
    let last = 0;

    const step = (now) => {
      if (now - last >= tick) {
        last = now;
        revealed = Math.min(text.length, revealed + perTick);
        setOut(scramble(text, revealed));
      }
      if (revealed < text.length) raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [text, active, tick, perTick, reduce]);

  return out;
};
