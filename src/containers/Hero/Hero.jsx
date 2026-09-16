import React, { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { profile } from "../../data/portfolio";
import SocialLinks from "../../components/SocialLinks";
import SectionRule from "../../components/SectionRule";
import WindowCard from "../../components/WindowCard";
import { useTypewriter } from "../../hooks/useTypewriter";
import {
  DUR,
  cornerIn,
  fadeUp,
  gridIn,
  lineUp,
  popOn,
  steps,
  useParent,
  useWithChildren,
} from "../../utils/motion";
import "./Hero.scss";

const stack = ["React", "Next.js", "React Native", "Node.js", "TypeScript", "AWS"];

const avatarIn = {
  hidden: { opacity: 0, scale: 0.86 },
  show: { opacity: 1, scale: 1, transition: { duration: DUR.sm, ease: steps(4) } },
};

const Hero = () => {
  const reduce = useReducedMotion();
  const [booted, setBooted] = useState(false);
  const roleText = useTypewriter(profile.roles, { start: booted });
  const card = useWithChildren(gridIn, 0.065, 0.2);
  const actions = useParent(0.06);
  const socials = useParent(0.05);
  const stackRow = useParent(0.04);

  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 700], [0, 140]);
  const glowOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" className="hero">
      <SectionRule />
      <motion.div
        className="hero__glow"
        aria-hidden="true"
        style={reduce ? undefined : { y: glowY, opacity: glowOpacity }}
      />

      <div className="container hero__inner">
        <WindowCard
          path="~/gaurav-kamble/README.md"
          tag="profile"
          dotColor="var(--ok)"
          className="hero__card"
          scanline
          variants={card}
          initial="hidden"
          animate="show"
          onAnimationComplete={() => setBooted(true)}
        >
          <motion.div className="hero__avatar" variants={avatarIn}>
            <img src="/gaurav-photo.png" alt="Gaurav Kamble" />
          </motion.div>

          <motion.p className="hero__greeting" variants={fadeUp}>
            Hey, I'm Gaurav 👋
          </motion.p>

          <h1 className="hero__name">
            <span className="hero__line">
              <motion.span className="mask-line" variants={lineUp}>
                I build <span className="gradient-text">full-stack products</span>
              </motion.span>
            </span>
            <span className="hero__line">
              <motion.span className="mask-line" variants={lineUp}>
                and wire them up with AI.
              </motion.span>
            </span>
          </h1>

          <motion.div className="hero__role mono" variants={popOn}>
            <span className="hero__role-label">$</span>
            <span>{roleText}</span>
            <span className="hero__cursor" aria-hidden="true" />
          </motion.div>

          <motion.p className="hero__tagline" variants={fadeUp}>
            Right now I'm at Housingram shipping React, Next.js, React Native, and
            Node.js features for a real-estate ERP — plus the OpenAI/Gemini
            integrations that make them smarter.
          </motion.p>

          <motion.div className="hero__actions" variants={actions}>
            <motion.a href="#projects" className="btn btn--primary" variants={gridIn}>
              View Projects →
            </motion.a>
            <motion.a
              href={profile.resumeUrl}
              className="btn btn--ghost"
              download
              variants={gridIn}
            >
              <FiDownload /> Resume
            </motion.a>
          </motion.div>

          <motion.div variants={socials}>
            <SocialLinks className="hero__socials" itemVariants={cornerIn} />
          </motion.div>

          <motion.div className="hero__stack mono" variants={stackRow}>
            {stack.map((item, i) => (
              <React.Fragment key={item}>
                <motion.span variants={popOn}>{item}</motion.span>
                {i !== stack.length - 1 && (
                  <motion.span className="hero__stack-dot" variants={popOn}>
                    ·
                  </motion.span>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </WindowCard>
      </div>
    </section>
  );
};

export default Hero;
