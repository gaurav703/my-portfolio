import React from "react";
import { motion } from "framer-motion";
import SectionRule from "../../components/SectionRule";
import ScrambleText from "../../components/ScrambleText";
import SocialLinks from "../../components/SocialLinks";
import { profile } from "../../data/portfolio";
import { cornerIn, popOn, reveal, useParent } from "../../utils/motion";
import "./Footer.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  const inner = useParent(0.08);

  return (
    <footer className="footer">
      <SectionRule />
      <motion.div
        className="container footer__inner"
        {...reveal(inner, { once: true, amount: 0.4 })}
      >
        <ScrambleText as="p" className="footer__brand mono" text="gaurav.dev" />
        <SocialLinks className="footer__socials" itemVariants={cornerIn} />
        <motion.p className="footer__copy mono" variants={popOn}>
          © {year} {profile.name} — built with React &amp; Framer Motion
        </motion.p>
      </motion.div>
    </footer>
  );
};

export default Footer;
