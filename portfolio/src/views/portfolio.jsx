import React, { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import { Home } from "../components/home";
import { About } from "../components/about";
import { Projects } from "../components/projects";
import { Contact } from "../components/contact";
import Snowfall from 'react-snowfall'

export const Portfolio = () => {
  const [pageHeight, setPageHeight] = useState(0);

  const getPageHeight = () => {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
      body.scrollHeight, 
      body.offsetHeight, 
      html.clientHeight, 
      html.scrollHeight, 
      html.offsetHeight
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setPageHeight(getPageHeight());
    };
    setPageHeight(getPageHeight());
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Snowfall
        style={{ height: pageHeight, zIndex: -1 }}
        snowflakeCount={200}
      />
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Contact />
    </>
  );
};
