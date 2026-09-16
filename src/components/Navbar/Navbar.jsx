import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme";
import { navLinks, profile } from "../../data/portfolio";
import { steps } from "../../utils/motion";
import "./Navbar.scss";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { mode, toggleMode } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    setToggle(false);
    setActive(id);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <a href="#home" className="navbar__logo mono" onClick={() => handleNavClick("home")}>
          <motion.span
            className="navbar__logo-dot"
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 0.3, ease: steps(3) }}
            key={active}
          />
          gaurav.dev
          {/* home is filtered out of the link list, so the marker parks here
              instead of unmounting and losing its layout animation */}
          {active === "home" && (
            <motion.span className="navbar__underline" layoutId="nav-underline-desktop" />
          )}
        </a>

        <ul className="navbar__links mono">
          {navLinks
            .filter((l) => l.id !== "home")
            .map((link, i, arr) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={active === link.id ? "is-active" : ""}
                  onClick={() => handleNavClick(link.id)}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.span
                      className="navbar__underline"
                      layoutId="nav-underline-desktop"
                    />
                  )}
                </a>
                {i !== arr.length - 1 && <span className="navbar__sep">/</span>}
              </li>
            ))}
        </ul>

        <div className="navbar__actions">
          <a href={profile.resumeUrl} className="navbar__resume mono" download>
            Resume
          </a>
          <button
            className="theme-toggle"
            role="switch"
            aria-checked={mode === "dark"}
            aria-label="Toggle theme"
            onClick={toggleMode}
          >
            <FiSun className="theme-toggle__icon theme-toggle__icon--sun" />
            <FiMoon className="theme-toggle__icon theme-toggle__icon--moon" />
            <motion.span
              className="theme-toggle__thumb"
              animate={{ x: mode === "dark" ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>

          <button
            className="navbar__burger"
            aria-label="Toggle menu"
            onClick={() => setToggle((prev) => !prev)}
          >
            {toggle ? <HiX /> : <HiMenuAlt4 />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {toggle && (
          <motion.div
            className="navbar__mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ul className="mono">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={active === link.id ? "is-active" : ""}
                    onClick={() => handleNavClick(link.id)}
                  >
                    {link.label}
                    {active === link.id && (
                      <motion.span
                        className="navbar__underline"
                        layoutId="nav-underline-mobile"
                      />
                    )}
                  </a>
                </li>
              ))}
              <li>
                <a href={profile.resumeUrl} download>
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
