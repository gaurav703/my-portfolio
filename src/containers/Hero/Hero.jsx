import React, { useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FiArrowDown, FiDownload } from "react-icons/fi";
import { profile } from "../../data/portfolio";
import Magnetic from "../../components/Magnetic";
import SocialLinks from "../../components/SocialLinks";
import { useTypewriter } from "../../hooks/useTypewriter";
import { EASE, cornerIn, fadeUp, useParent } from "../../utils/motion";
import HeroCanvas from "./HeroCanvas";
import "./Hero.scss";

const FIRST = "Gaurav";
const LAST = "Kamble";

const marquee = [
  "React",
  "Next.js",
  "React Native",
  "Node.js",
  "TypeScript",
  "AWS",
  "OpenAI",
  "Gemini",
  "MongoDB",
  "PostgreSQL",
  "Tailwind",
  "Framer Motion",
];

const floatCards = [
  { k: "2+", v: "years shipping", cls: "hero__float--a" },
  { k: "AI", v: "LLM integrations", cls: "hero__float--b" },
  { k: "5K+", v: "downloads in 2 days", cls: "hero__float--c" },
];

// No opacity here: the mask already hides the letter, so text is never left invisible.
const letter = {
  hidden: { y: "115%", rotate: 12 },
  show: (i) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 0.9, ease: [0.34, 1.56, 0.64, 1], delay: 0.25 + i * 0.045 },
  }),
};

const visualIn = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE.out, delay: 0.3 } },
};

// The portrait rises out of the disc after the disc itself has landed.
const portraitIn = {
  hidden: { y: "18%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 1.1, ease: EASE.out, delay: 0.6 } },
};

const Word = ({ text, offset = 0, className = "" }) => (
  <span className={`hero__word ${className}`} aria-hidden="true">
    {text.split("").map((ch, i) => (
      <span className="hero__letter-mask" key={i}>
        <motion.span className="hero__letter" custom={offset + i} variants={letter}>
          {ch}
        </motion.span>
      </span>
    ))}
  </span>
);

const Hero = () => {
  const reduce = useReducedMotion();
  const [booted, setBooted] = useState(false);
  const roleText = useTypewriter(profile.roles, { start: booted });
  const copy = useParent(0.09, 0.1);
  const socials = useParent(0.06);

  // Mouse-driven 3D tilt for the portrait.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 });
  const shiftX = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 80, damping: 20 });
  const shiftY = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), { stiffness: 80, damping: 20 });

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Content drifts up and fades as you scroll away.
  const { scrollY } = useScroll();
  const copyY = useTransform(scrollY, [0, 700], [0, -120]);
  const visualY = useTransform(scrollY, [0, 700], [0, 80]);
  const fade = useTransform(scrollY, [0, 550], [1, 0]);

  return (
    <section id="home" className="hero" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <HeroCanvas />
      </div>

      <div className="container hero__inner">
        <motion.div
          className="hero__copy"
          variants={copy}
          initial="hidden"
          animate="show"
          onAnimationComplete={() => setBooted(true)}
          style={reduce ? undefined : { y: copyY, opacity: fade }}
        >
          <motion.div className="hero__badge mono" variants={fadeUp}>
            <span className="hero__badge-dot" />
            Available for new opportunities
          </motion.div>

          <motion.p className="hero__greeting" variants={fadeUp}>
            Hey there, I'm
          </motion.p>

          <h1 className="hero__name" aria-label={profile.name}>
            <Word text={FIRST} className="hero__word--first" />
            <Word text={LAST} offset={FIRST.length} className="gradient-text hero__word--last" />
          </h1>

          <motion.p className="hero__statement" variants={fadeUp}>
            I build <span className="hero__highlight">full-stack products</span> and wire
            them up with <span className="hero__highlight hero__highlight--ai">AI</span>.
          </motion.p>

          <motion.div className="hero__role mono" variants={fadeUp}>
            <span className="hero__role-label">~/role $</span>
            <span>{roleText}</span>
            <span className="hero__cursor" aria-hidden="true" />
          </motion.div>

          <motion.p className="hero__tagline" variants={fadeUp}>
            Right now I'm at Housingram shipping React, Next.js, React Native, and Node.js
            features for a real-estate ERP — plus the OpenAI/Gemini integrations that make
            them smarter.
          </motion.p>

          <motion.div className="hero__actions" variants={fadeUp}>
            <Magnetic href="#projects" className="btn btn--primary hero__cta">
              View Projects <span className="hero__cta-arrow">→</span>
            </Magnetic>
            <Magnetic href={profile.resumeUrl} className="btn btn--ghost" download>
              <FiDownload /> Resume
            </Magnetic>
          </motion.div>

          <motion.div variants={socials}>
            <SocialLinks className="hero__socials" itemVariants={cornerIn} />
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual-wrap"
          style={reduce ? undefined : { y: visualY, opacity: fade }}
        >
          <motion.div
            className="hero__portrait"
            variants={visualIn}
            initial="hidden"
            animate="show"
            style={reduce ? undefined : { rotateX, rotateY }}
          >
            <div className="hero__glow" />
            <div className="hero__ring">
              <span className="hero__ring-dot" />
            </div>
            <div className="hero__disc" />
            <div className="hero__clip">
              <motion.img
                className="hero__photo"
                src="/hero-portrait.png"
                alt="Gaurav Kamble"
                variants={portraitIn}
              />
            </div>

            {floatCards.map((card, i) => (
              <motion.div
                key={card.k}
                className={`hero__float ${card.cls}`}
                style={reduce ? undefined : { x: shiftX, y: shiftY }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.15, type: "spring", stiffness: 260, damping: 18 }}
              >
                <span className="hero__float-k gradient-text">{card.k}</span>
                <span className="hero__float-v mono">{card.v}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track mono">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={i} className="hero__marquee-item">
              {item}
              <span className="hero__marquee-star">✦</span>
            </span>
          ))}
        </div>
      </div>

      <a href="#about" className="hero__scroll mono" aria-label="Scroll to About">
        <span className="hero__scroll-mouse">
          <span className="hero__scroll-wheel" />
        </span>
        <FiArrowDown />
      </a>
    </section>
  );
};

export default Hero;
