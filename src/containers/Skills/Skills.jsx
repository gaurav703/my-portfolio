import React from "react";
import { motion } from "framer-motion";
import Section from "../../components/Section";
import WindowCard from "../../components/WindowCard";
import { skillGroups } from "../../data/portfolio";
import { VIEW, gridIn, popOn, useParent, useWithChildren } from "../../utils/motion";
import "./Skills.scss";

const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Skills = () => {
  const grid = useParent(0.07);
  const groupVariant = useWithChildren(gridIn, 0.022, 0.08);

  return (
    <Section
      id="skills"
      index="03"
      eyebrow="Toolbox"
      rightMeta={<>COUNT <span>{skillGroups.reduce((n, g) => n + g.skills.length, 0)} TOOLS</span></>}
      title="Skills & Technologies"
      subtitle="The languages, frameworks, and tools I reach for to ship full-stack products end-to-end."
    >
      <motion.div
        className="skills-grid"
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={VIEW}
      >
        {skillGroups.map((group) => (
          <WindowCard
            key={group.category}
            path={`/skills/${slugify(group.category)}`}
            tag={`${group.skills.length} items`}
            variants={groupVariant}
          >
            <div className="skills-group__list">
              {group.skills.map((skill) => (
                <motion.span className="tag-chip" key={skill} variants={popOn}>
                  {skill}
                </motion.span>
              ))}
            </div>
          </WindowCard>
        ))}
      </motion.div>
    </Section>
  );
};

export default Skills;
