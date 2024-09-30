import React, { useEffect, useRef, useState } from "react";

const cvImage = '/assets/cv.png';

export const About = () => {
  const [showCVPopup, setShowCVPopup] = useState(false);
  const [threshold, setThreshold] = useState(0.8);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setThreshold(0.3);
      } else {
        setThreshold(0.8);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          localStorage.setItem('visible', 'about');
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [threshold]);

  return (
    <div className="about-container" id="about">
      <div className="about-content">
        <h2 className="about-title">À propos de moi</h2>
        <div className="about-text" ref={elementRef}>
          <p>Je m'appelle Gaston Leroy et je suis actuellement en deuxième année à Epitech, où je me spécialise dans le développement web. Mon parcours académique et professionnel m'a permis d'explorer divers aspects de la programmation, avec une préférence marquée pour les technologies telles que React et Symfony.</p>
          <p>J'ai découvert ma passion pour la création d'applications web interactives et intuitives grâce à React, tout en développant des compétences solides en back-end avec Symfony. Chaque projet sur lequel j'ai travaillé m'a apporté de nouvelles connaissances et a renforcé ma détermination à exceller dans le domaine du développement web.</p>
          <p>Ma philosophie de développement repose sur la création de solutions robustes et élégantes, en mettant l'accent sur une expérience utilisateur fluide et agréable. Je suis constamment à l'affût des dernières tendances et technologies, cherchant à repousser les limites de ce qui est possible.</p>
        </div>
        <div className="cv-btn-container">
          <a href="/assets/cv.png" download="GastonLeroyCV.png">
            <button className="cv-btn" onMouseEnter={() => setShowCVPopup(true)} onMouseLeave={() => setShowCVPopup(false)}>
              Télécharger mon CV
            </button>
          </a>
          {showCVPopup && (
            <div className="cv-popup">
              <img src={cvImage} alt="CV" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
