import React, { useState } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Skills.scss";
import { useTheme } from "../../hooks/useTheme";

const Skills = () => {
  const experiences = [
    {
      year: "MAY-2025 - PRESENT",
      works: [
        {
          name: "Software Engineer",
          company: "Aeons Technologies Pvt. Ltd.",
          desc: `Developed a production-level Android application using Android Studio, Jetpack Compose, and Kotlin, 
responsible for the entire frontend development. Designed robust architecture, implemented animations, error handling, and optimized performance. Integrated APIs, managed state and data flow, following best practices. Achieved 5000+ downloads in 2 days with high user engagement. Collaborated with cross-functional teams to deliver features on time.`,
        },
      ],
    },
    {
      year: "DEC-2024 - MAY-2025",
      works: [
        {
          name: "Software Engineer Intern",
          company: "Aeons Technologies Pvt. Ltd.",
          desc: `Worked on multiple frontend and backend projects including websites, admin portals, ERP software, and Android apps. Contributed to a Service Management application using React, Next.js, React Native, TypeScript, and Tailwind CSS (20+ active users). Developed and maintained ERP modules, ensuring responsive UI, optimized API integration, and seamless experience. Collaborated with senior developers on debugging, refactoring, and implementing new features.`,
        },
      ],
    },
    {
      year: "AUG-2022 - PRESENT",
      works: [
        {
          name: "Core Member",
          company: "RNXG",
          desc: `Led and mentored over 2 projects, including planning, resource allocation, and delivery management. Guided team members through technical challenges, ensuring alignment with project goals. Facilitated communication within the team and stakeholders, contributing to successful project execution and improved productivity.`,
        },
      ],
    },
  ];

  const [skills] = useState([
    { name: "HTML", bgColor: "#f16529", imgUrl: "/html.png" },
    { name: "CSS", bgColor: "#2965f1", imgUrl: "/css.svg" },
    { name: "JavaScript", bgColor: "#f0db4f", imgUrl: "/javascript.png" },
    { name: "React.js", bgColor: "#61dbfb", imgUrl: "/Reactjs.png" },
    { name: "Node.js", bgColor: "#68a063", imgUrl: "/nodejs.png" },
    { name: "Express.js", bgColor: "#000", imgUrl: "/express.jpg" },
    { name: "MongoDB", bgColor: "#4db33d", imgUrl: "/mongo.png" },
    { name: "Git", bgColor: "#f34f29", imgUrl: "/git.png" },
    { name: "Tailwind CSS", bgColor: "#06b6d4", imgUrl: "/tailwind.png" },
    { name: "Next.js", bgColor: "#000", imgUrl: "/nextjs.png" },
    { name: "React Native", bgColor: "#61dbfb", imgUrl: "/Reactjs.png" },
  ]);

  const { mode } = useTheme();

  return (
    <>
      <h2 className={`head-text ${mode}`}>Skills & Experiences</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className={`app__skills-item ${mode} app__flex`}
              key={index}
            >
              <div className="app__flex" style={{ backgroundColor: "rgb(237, 242, 248)" }}>
                <img src={skill.imgUrl} alt={skill.name} />
              </div>
              <p className={`p-text ${mode}`}>{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience.year}>
              <div className="app__skills-exp-year">
                <p className={`bold-text ${mode}`}>{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    className="app__skills-exp-work"
                    key={work.name}
                  >
                    <h4 className={`bold-text ${mode}`}>{work.name}</h4>
                    <p className={`p-text ${mode}`}>{work.company}</p>
                    <p className={`p-text ${mode}`}>{work.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(Skills, "app__skills"), "skills", "app__whitebg");
