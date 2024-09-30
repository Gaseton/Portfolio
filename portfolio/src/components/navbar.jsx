import React, { useEffect, useState } from "react";

export const Navbar = () => {
  const [visible, setVisible] = useState('home');
  
  const updateVisible = () => {
    const newValue = localStorage.getItem('visible');
    if (newValue) {
      setVisible(newValue);
    }
  };

  useEffect(() => {
    updateVisible();
    const handleStorageChange = (event) => {
      if (event.key === 'visible') {
        updateVisible();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    const interval = setInterval(() => {
      updateVisible();
    }, 100); 

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="navigation-container">
      <div className="navigation-contain">
        <a className={visible === 'home' ? "navigation-btn-hover" : "navigation-btn"} href="#home">Home</a>
        <a className={visible === 'about' ? "navigation-btn-hover" : "navigation-btn"} href="#about">About</a>
        <a className={visible === 'projects' ? "navigation-btn-hover" : "navigation-btn"} href="#projects">Projects</a>
        <a className={visible === 'contact' ? "navigation-btn-hover" : "navigation-btn"} href="#contact">Contact</a>
      </div>
    </div>
  );
}
