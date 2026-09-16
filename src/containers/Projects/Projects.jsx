import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Section from "../../components/Section";
import WindowCard from "../../components/WindowCard";
import { projects } from "../../data/portfolio";
import { useCountUp } from "../../hooks/useCountUp";
import { DUR, EASE } from "../../utils/motion";
import "./Projects.scss";

const FILTERS = ["All", "Web App", "Mobile App"];

const ShowingMeta = ({ n, total }) => {
  const count = useCountUp(n, { duration: 0.35, notches: Math.max(2, n) });
  return (
    <>
      SHOWING{" "}
      <span>
        {count} / {total}
      </span>
    </>
  );
};

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <Section
      id="projects"
      index="04"
      eyebrow="Work"
      rightMeta={<ShowingMeta n={filtered.length} total={projects.length} />}
      title="Selected Projects"
      subtitle="A mix of production work and side projects — from AI-powered monitoring tools to mobile apps used by thousands."
      alt
    >
      <div className="projects__filters mono">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`projects__filter ${activeFilter === filter ? "is-active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {activeFilter === filter && (
              <motion.span
                className="projects__filter-bg"
                layoutId="projects-filter"
                transition={{ duration: DUR.sm, ease: EASE.snap }}
              />
            )}
            <span className="projects__filter-label">{filter}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="projects__grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              whileHover="hover"
              variants={{
                hover: { y: -6, transition: { duration: DUR.xs, ease: EASE.snap } },
              }}
            >
              <WindowCard
                path={`/projects/${slugify(project.title)}`}
                tag={project.category}
                dotColor={project.featured ? "var(--accent)" : "var(--text-tertiary)"}
                className="project-card"
                scanline
              >
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__description">{project.description}</p>

                {project.points && (
                  <ul className="project-card__points">
                    {project.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}

                <div className="project-card__footer">
                  <div className="project-card__tags">
                    {project.tags.map((tag) => (
                      <span className="tag-chip" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="project-card__links">
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} source code`}
                        className="icon-btn"
                      >
                        <FiGithub />
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="icon-btn"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>
              </WindowCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
};

export default Projects;
