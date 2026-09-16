import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "../data/portfolio";

const SocialLinks = ({ className = "", itemVariants }) => {
  const links = [
    { href: profile.social.github, label: "GitHub", icon: <FiGithub /> },
    { href: profile.social.linkedin, label: "LinkedIn", icon: <FiLinkedin /> },
    { href: `mailto:${profile.email}`, label: "Email", icon: <FiMail /> },
  ];

  return (
    <div className={`social-links ${className}`}>
      {links.map((link) => (
        <motion.a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noreferrer"
          aria-label={link.label}
          className="icon-btn"
          variants={itemVariants}
        >
          {link.icon}
        </motion.a>
      ))}
    </div>
  );
};

export default SocialLinks;
