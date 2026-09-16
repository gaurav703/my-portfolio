export const profile = {
  name: "Gaurav Kamble",
  roles: [
    "Full-Stack Software Engineer",
    "React & Next.js Developer",
    "React Native Developer",
    "LLM / AI Integration Engineer",
  ],
  tagline:
    "I build fast, reliable full-stack products across web, mobile, and Node.js services — and wire up LLMs to make them smarter.",
  location: "Bengaluru, India",
  email: "gauravkamble704@gmail.com",
  phone: "+91 77095 51702",
  phoneHref: "+917709551702",
  resumeUrl: "/Gaurav_Kamble_Resume.pdf",
  social: {
    github: "https://github.com/gaurav703",
    linkedin: "https://linkedin.com/in/gaurav-kamble",
    portfolio: "https://my-portfolio-six-dusky-27.vercel.app/",
  },
};

export const about = {
  heading: "Turning ideas into reliable, production-ready software",
  paragraphs: [
    "I'm a full-stack software engineer currently building real-estate ERP software at Housingram, where I ship features across React/Next.js web apps, React Native mobile apps, and Node.js services used by 500+ active users.",
    "I care most about the seams — API design, structured LLM outputs, auth flows, and performance — the unglamorous work that makes a product actually reliable in production.",
    "Outside of core feature work, I've built full-stack OpenAI/Gemini integrations for report summarization, lead qualification, and document extraction, and set up CI-friendly OTA update pipelines for mobile apps.",
  ],
  highlights: [
    {
      title: "Full-Stack Development",
      description:
        "React, Next.js (SSR/SSG), React Native, and Node.js/Express REST services shipped end-to-end.",
      icon: "code",
    },
    {
      title: "LLM Integration",
      description:
        "OpenAI & Gemini API integrations with prompt engineering and structured JSON outputs for production parsing.",
      icon: "brain",
    },
    {
      title: "Cloud & Auth",
      description:
        "AWS Cognito auth flows with Lambda triggers, Docker, and CI/CD pipelines with OTA mobile updates.",
      icon: "cloud",
    },
    {
      title: "Performance",
      description:
        "SSR, code splitting, and render optimization — improved web performance by ~30% in production.",
      icon: "bolt",
    },
  ],
  education: [
    {
      school: "Shri Guru Gobind Singhji Institute of Engineering & Technology",
      degree: "B.Tech, Computer Science and Engineering — CGPA: 7.4/10",
      period: "May 2021 – May 2025",
      location: "Nanded, Maharashtra",
    },
    {
      school: "Bajaj College of Science",
      degree: "Higher Secondary (Science) — 94.67%",
      period: "May 2019 – May 2021",
      location: "Wardha, Maharashtra",
    },
  ],
};

export const experience = [
  {
    company: "22nd Century Innovations Pvt. Ltd. (Housingram)",
    role: "Software Engineer",
    period: "Nov 2025 – Present",
    location: "Bengaluru, India",
    points: [
      "Built and shipped full-stack features across web (React/Next.js), mobile (React Native), and Node.js services for a real-estate ERP serving 500+ active users, with a reusable component and Redux Toolkit system that cut code duplication by ~25%.",
      "Built full-stack OpenAI/LLM integrations (API design + prompt engineering) powering automated report summarization, lead qualification, and document data extraction — using structured (JSON) outputs for reliable, production-ready parsing.",
      "Designed and built Node.js REST services for the Sales, Inventory, and Reporting modules — pagination, filtering, and role-based access control.",
      "Implemented a custom AWS Cognito authentication flow (Lambda triggers) for builder onboarding and integrated Meta Lead Ads into the lead-generation pipeline.",
      "Improved web performance by ~30% via SSR, code splitting, and render optimization, and set up OTA updates for the React Native apps for instant production fixes.",
    ],
    tags: ["React", "Next.js", "React Native", "Node.js", "AWS Cognito", "OpenAI API"],
    current: true,
  },
  {
    company: "Aeons Technologies Pvt. Ltd.",
    role: "Software Engineer",
    period: "Dec 2024 – Nov 2025",
    location: "Nagpur, India",
    points: [
      "Developed and maintained production web apps, admin portals, and ERP systems using React, Next.js, React Native, TypeScript, Kotlin, and Jetpack Compose.",
      "Built a Service Management platform used by 100+ active users, owning frontend development, API integration, responsive UI, state management, and scalable architecture.",
      "Shipped a production Android app (Kotlin, Jetpack Compose) with animations, error handling, and performance optimization — reaching 5,000+ downloads within 2 days of launch while collaborating with senior engineers.",
    ],
    tags: ["React", "Next.js", "React Native", "Kotlin", "Jetpack Compose", "TypeScript"],
    current: false,
  },
];

export const skillGroups = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "C/C++", "SQL"],
  },
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js (SSR/SSG)",
      "React Native",
      "Redux Toolkit",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Backend & Database",
    skills: ["Node.js", "Express.js", "REST APIs", "MongoDB", "PostgreSQL", "Firebase"],
  },
  {
    category: "AI Integration",
    skills: ["OpenAI API", "Gemini API", "Prompt Engineering", "Structured Outputs"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS Cognito", "AWS Lambda", "Docker", "CI/CD", "Git", "GitHub"],
  },
  {
    category: "Developer Tools",
    skills: ["Figma", "Android Studio", "Claude Code", "GitHub Copilot", "Cursor"],
  },
];

export const projects = [
  {
    title: "Competitor Intelligence Monitor",
    category: "Web App",
    description:
      "A full-stack competitor-monitoring platform tracking Play Store, App Store, RSS, Google News, and Reddit via a hash-diff pipeline, with Gemini-based relevance filtering to cut noise from raw change feeds.",
    points: [
      "Serverless cron architecture (external scheduler + Vercel background functions) with async job state to reliably complete long-running AI analysis within short request windows.",
      "Cross-source deduplication by matching stories across RSS and Google News using normalized titles, eliminating duplicate alerts for the same event.",
    ],
    tags: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Gemini API"],
    codeLink: "https://github.com/gaurav703/competitor-intelligence-monitor",
    liveLink: "",
    featured: true,
  },
  {
    title: "Krishimitra — Agri-Tech App",
    category: "Mobile App",
    description:
      "A React Native app delivering real-time weather and APMC price updates to help farmers plan sowing and selling decisions, improving planning efficiency by ~25%.",
    points: [
      "Designed an e-commerce marketplace with customizable notifications, boosting direct sales by ~30% and lifting user engagement by ~40% through timely updates.",
    ],
    tags: ["React Native", "TypeScript", "Node.js", "Express.js", "MongoDB"],
    codeLink: "https://github.com/gaurav703/Krishimitra",
    liveLink: "",
    featured: true,
  },
  {
    title: "CryptoPriceX",
    category: "Mobile App",
    description:
      "An Android app providing real-time cryptocurrency price tracking, live updates, and detailed analysis for various cryptocurrencies.",
    tags: ["Android", "Java"],
    codeLink: "https://github.com/gaurav703/CryptoPriceX",
    liveLink: "",
    featured: false,
  },
  {
    title: "DevEvents",
    category: "Web App",
    description:
      "A web application for finding and managing developer events, built with Next.js and Tailwind CSS.",
    tags: ["Next.js", "Tailwind CSS"],
    codeLink: "https://github.com/gaurav703/DevEvents",
    liveLink: "https://devmeets-gold.vercel.app/",
    featured: false,
  },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
