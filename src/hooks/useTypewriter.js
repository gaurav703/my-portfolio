import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TYPE_SPEED = 65;
const DELETE_SPEED = 35;
const HOLD_TIME = 1400;

export const useTypewriter = (words, { start = true } = {}) => {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!start || reduce) return undefined;

    const current = words[index % words.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), HOLD_TIME);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          const next = deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1);
          setText(next);
        },
        deleting ? DELETE_SPEED : TYPE_SPEED
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, start, reduce]);

  // A perpetual text loop is exactly what prefers-reduced-motion exists to stop,
  // and MotionConfig cannot see plain timers.
  if (reduce) return words[0];

  return text;
};
