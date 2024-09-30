import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

const images = [
  {
    src: '/assets/ecommerce.png',
    title: 'E-commerce',
    description: '- Rédiger un Cahier Des Charges\n- Rédiger des spécifications techniques\n- Réaliser une maquette\n- Identifier les fonctionnalités à développer\n- Déployer un environnement de travail\n-Rédiger une présentation\n-Rédiger le code de la solution\n-Rédiger une documentation utilisateur\n-Implémenter la partie front-end\n-Implémenter la logique et la base de données\n-Implémenter des règles d\'authentification\n-Analyser la qualité de l’ergonomie et la qualité de l’accessibilité\n-Développer le prototype', 
    logo: ['/assets/react.png', '/assets/symfony.png', '/assets/mysql.png'],
  },
  {
    src: '/assets/spotify.png',
    title: 'Spotify',
    description: '- Déployer un environnement de travail\n- Rédiger une présentation\n-Intégrer les différents éléments\n-Implémenter la partie front-end\n-Implémenter un plan de tests\n-Identifier des améliorations qualitatives et de performance\n-Analyser la qualité de l’ergonomie et la qualité de l’accessibilité',
    logo: ['/assets/react.png'],
  },
  {
    src: '/assets/portfolio.png',
    title: 'Portfolio',
    description: '-Déployer une application web\n-Identifier des améliorations qualitatives et de performance\n-Analyser la qualité de l’ergonomie et la qualité de l’accessibilité\n-Réaliser une maquette\n-Intégrer les différents éléments\n-Monitorer le lancement',
    logo: ['/assets/react.png'],
  },
  {
    src: '/assets/tweetos.png',
    title: 'Twitter',
    description: '-Développer le prototype\n-Implémenter la partie front-end\n-Implémenter la logique et la base de données\n-Réaliser une maquette\n-Rédiger une documentation technique\n-Déployer un environnement de travail\n-Rédiger le code de la solution',
    logo: ['/assets/react.png', '/assets/symfony.png', '/assets/mysql.png'],
  },
];

export const Projects = () => {
  const [index, setIndex] = useState(0);
  const [imageStyle, setImageStyle] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const elementRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          localStorage.setItem('visible', 'projects');
        }
      },
      { threshold: 0.8 }
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

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    resetInterval();
    setImageStyle({
      transition: 'opacity 0s',
      opacity: '0',
    });
    setTimeout(() => {
      setImageStyle({
        transition: 'opacity 1s ease-in-out',
        opacity: '1',
      });
    }, 250);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    resetInterval();
    setImageStyle({
      transition: 'opacity 0s',
      opacity: '0',
    });
    setTimeout(() => {
      setImageStyle({
        transition: 'opacity 1s ease-in-out',
        opacity: '1',
      });
    }, 250);
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!isModalOpen) {
      intervalRef.current = setInterval(() => {
        setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        setImageStyle({
          transition: 'opacity 0s',
          opacity: '0',
        });
        setTimeout(() => {
          setImageStyle({
            transition: 'opacity 1s ease-in-out',
            opacity: '1',
          });
        }, 250);
      }, 30000);
    }
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetInterval();
  };

  return (
    <div className="projects-container" id="projects">
      <button onClick={handlePrev}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <img
        src={images[index].src}
        alt="project"
        style={imageStyle}
        ref={elementRef}
        onClick={openModal}
      />
      <button onClick={handleNext}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2>{images[index].title}</h2>
            <div className="modal-container">
              <img src={images[index].src} alt="project" className="modal-image" />
              <div>
                <div className="logo-container">
                  {images[index].logo && images[index].logo.length > 0 ? (
                    images[index].logo.map((logoSrc, idx) => (
                      <img
                        key={idx}
                        src={logoSrc}
                        alt={`Logo ${idx}`}
                        className="project-logo"
                      />
                    ))
                  ) : (
                    <p>Aucun logo pour ce projet.</p>
                  )}
                </div>
                {images[index].description.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
