import React from "react";
import { motion } from "framer-motion";
import { FiCloud, FiCode, FiCpu, FiZap } from "react-icons/fi";
import Section from "../../components/Section";
import { about } from "../../data/portfolio";
import { TRAVEL, fadeUp, gridIn, reveal, slideX, useParent } from "../../utils/motion";
import "./About.scss";

const icons = {
  code: <FiCode />,
  brain: <FiCpu />,
  cloud: <FiCloud />,
  bolt: <FiZap />,
};

const About = () => {
  const textColumn = useParent(0.08);
  const highlights = useParent(0.07);

  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      rightMeta={<>STACK <span>MERN · TS · AWS</span></>}
      title={about.heading}
    >
      <div className="about__layout">
        <motion.div
          className="about__text"
          {...reveal(textColumn, { once: true, amount: 0.3 })}
        >
          {about.paragraphs.map((p, i) => (
            <motion.p key={i} className="about__paragraph" variants={slideX(-TRAVEL.xs)}>
              {p}
            </motion.p>
          ))}

          <div className="about__education">
            {about.education.map((edu) => (
              <motion.div
                className="about__education-item"
                key={edu.school}
                variants={fadeUp}
              >
                <p className="about__education-school">{edu.school}</p>
                <p className="about__education-degree">{edu.degree}</p>
                <p className="about__education-meta mono">
                  {edu.period} · {edu.location}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about__highlights"
          {...reveal(highlights, { once: true, amount: 0.3 })}
        >
          {about.highlights.map((item) => (
            <motion.div
              className="about__highlight glass-card"
              key={item.title}
              variants={gridIn}
              whileHover={{ y: -4 }}
            >
              <div className="about__highlight-icon">{icons[item.icon]}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
