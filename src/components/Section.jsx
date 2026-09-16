import React from "react";
import { motion } from "framer-motion";
import SectionRule from "./SectionRule";
import ScrambleText from "./ScrambleText";
import { fadeUp, lineUp, popOn, useParent, VIEW_HEAD } from "../utils/motion";

const Section = ({
  id,
  index,
  eyebrow,
  rightMeta,
  title,
  subtitle,
  center = false,
  alt = false,
  className = "",
  children,
}) => {
  const head = useParent(0.07);
  const eyebrowRow = useParent(0.05);

  return (
    <>
      <SectionRule />
      <section
        id={id}
        className={`section ${alt ? "section--alt" : ""} ${className}`}
      >
        <div className="container">
          {(eyebrow || title || subtitle) && (
            <motion.div
              className={`section__head ${center ? "section__head--center" : ""}`}
              variants={head}
              initial="hidden"
              whileInView="show"
              viewport={VIEW_HEAD}
            >
              {eyebrow && (
                <motion.div className="section__eyebrow-row" variants={eyebrowRow}>
                  <motion.span className="section__eyebrow mono" variants={popOn}>
                    {index && <span className="section__index">{index}</span>}
                    <span className="section__eyebrow-dash">——</span>
                    <ScrambleText text={eyebrow} />
                  </motion.span>
                  {rightMeta && (
                    <motion.span className="section__meta mono" variants={popOn}>
                      {rightMeta}
                    </motion.span>
                  )}
                </motion.div>
              )}
              {title && (
                <h2 className="section__title">
                  <motion.span className="mask-line" variants={lineUp}>
                    {title}
                  </motion.span>
                </h2>
              )}
              {subtitle && (
                <motion.p className="section__subtitle" variants={fadeUp}>
                  {subtitle}
                </motion.p>
              )}
            </motion.div>
          )}
          {children}
        </div>
      </section>
    </>
  );
};

export default Section;
