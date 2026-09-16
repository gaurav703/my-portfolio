import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { useScramble } from "../hooks/useScramble";

const ScrambleText = ({
  text,
  as: Tag = "span",
  once = true,
  tick,
  className = "",
  ...rest
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.6 });
  const out = useScramble(text, { active: inView, tick });

  return (
    <Tag ref={ref} className={className} aria-label={text} {...rest}>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
};

export default ScrambleText;
