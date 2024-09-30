import React, { useState, useEffect, useRef } from "react";

export const Home = () => {
  const array = ['Web Developer.', 'React Developer.', 'Symfony Developer.'];
  const [state, setState] = useState(array[0]);
  const [write, setWrite] = useState(true);
  const [index, setIndex] = useState(0);
  const [cursorIndex, setCursorIndex] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          localStorage.setItem('visible', 'home');
        }
      },
      { threshold: 1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(cursorWriter, 250);
    return () => clearInterval(intervalId);
  }, [cursorIndex, write]);

  function typeDeleted() {
    setTimeout(() => {
      const newString = array[index].substring(0, state.length - 1)
      setState(newString);
    }, 250);
    if (state.length === 0) {
      setWrite(true);
      if (index === array.length - 1) {
        setIndex(0);
      }
      else {
        setIndex(index + 1)
      }
    }
  };

  function typeWriter() {
    setTimeout(() => {
      const newString = array[index].substring(0, state.length + 1)
      setState(newString);
    }, 250);
    if (state.length === array[index].length) {
      setWrite(false);
    }
  };

  function cursorWriter() {
    if (cursorIndex === 0) {
      setCursorIndex(1);
    } else {
      setCursorIndex(0);
    }
    write === true ? typeWriter() : typeDeleted()
  }
  
  return (
    <div className="home-container" id="home">
      <div>
        <h1>Hello, I'm <span className="home-name">Gaston Leroy</span>.</h1>
        <h2>
          I'm a <span>{state}</span>
          <span className="home-cursor" style={{ opacity: cursorIndex }}>
            |
          </span>
        </h2>
      </div>
      <img className="home-image" src="/assets/profil.jpg" alt="placeholder" ref={elementRef} />
    </div>
  );
};
