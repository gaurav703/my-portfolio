import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Section from "../../components/Section";
import WindowCard from "../../components/WindowCard";
import { experience } from "../../data/portfolio";
import {
  DUR,
  TRAVEL,
  gridIn,
  popOn,
  slideX,
  steps,
  useWithChildren,
} from "../../utils/motion";
import "./Experience.scss";

const TimelineItem = ({ job }) => {
  const ref = useRef(null);
  const live = useInView(ref, { amount: 0.2, once: true });
  const card = useWithChildren(gridIn, 0.05, 0.15);

  return (
    <div className="timeline__item" ref={ref}>
      <motion.span
        className={`timeline__node ${live ? "is-live" : ""}`}
        aria-hidden="true"
        animate={{ scale: live ? [1, 1.75, 1] : 1 }}
        transition={{ duration: 0.22, ease: steps(3) }}
      />
      <WindowCard
        path={job.company}
        tag={job.period}
        dotColor={job.current ? "var(--ok)" : "var(--text-tertiary)"}
        className="timeline__card"
        variants={card}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="timeline__head">
          <h3>{job.role}</h3>
          <span className="timeline__location mono">{job.location}</span>
        </div>

        <ul className="timeline__points">
          {job.points.map((point, idx) => (
            <motion.li key={idx} variants={slideX(-TRAVEL.xs)}>
              {point}
            </motion.li>
          ))}
        </ul>

        <div className="timeline__tags">
          {job.tags.map((tag) => (
            <motion.span className="tag-chip" key={tag} variants={popOn}>
              {tag}
            </motion.span>
          ))}
        </div>
      </WindowCard>
    </div>
  );
};

const Experience = () => {
  const spineRef = useRef(null);
  const reduce = useReducedMotion();
  const [eof, setEof] = useState(false);

  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ["start 0.8", "end 0.55"],
  });
  // Quantised so the rail ratchets in discrete ticks instead of gliding.
  const notched = useTransform(scrollYProgress, (v) => Math.round(v * 32) / 32);

  useMotionValueEvent(notched, "change", (v) => setEof(v >= 1));

  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      rightMeta={<>STATUS <span>2 ROLES · 1.5+ YRS</span></>}
      title="Where I've worked"
      subtitle="A quick look at the teams I've shipped production software with."
      alt
    >
      <div className="timeline" ref={spineRef}>
        <div className="timeline__spine" aria-hidden="true">
          <motion.div
            className="timeline__spine-fill"
            style={{ scaleY: reduce ? 1 : notched }}
          />
        </div>

        {experience.map((job) => (
          <TimelineItem key={job.company} job={job} />
        ))}

        <motion.span
          className="timeline__eof mono"
          aria-hidden="true"
          animate={{ opacity: eof ? 1 : 0 }}
          transition={{ duration: DUR.instant }}
        >
          EOF
        </motion.span>
      </div>
    </Section>
  );
};

export default Experience;
