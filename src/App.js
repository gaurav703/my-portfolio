import React from "react";
import { MotionConfig } from "framer-motion";
import { AnimatedBackground, Navbar, ScrollProgress, ScrollToTop } from "./components";
import { About, Contact, Experience, Footer, Hero, Projects, Skills } from "./containers";
import "./App.scss";

const App = () => {
  return (
    <MotionConfig reducedMotion="user">
      <AnimatedBackground />
      <div className="app">
        <ScrollProgress />
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
        <ScrollToTop />
      </div>
    </MotionConfig>
  );
};

export default App;
