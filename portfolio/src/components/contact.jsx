import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Contact = () => {
  const elementRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          localStorage.setItem('visible', 'contact');
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { name, email, message } = formData;
    if (name && email && message) {
      toast.success('Message envoyé avec succès', {
        position: "top-center",
        autoClose: 3000,
        style: { 
          backgroundColor: '#091B29',
          color: '#fff'
        }
      });

      setFormData({ name: '', email: '', message: '' });
    } else {
      toast.error('Veuillez remplir tous les champs avant de soumettre', {
        position: "top-center",
        autoClose: 3000,
        style: { 
          backgroundColor: '#091B29',
          color: '#fff'
        }
      });
    }
  };

  return (
    <div className="contact-container" id="contact">
      <ToastContainer />
      <div className="contact-title">
        <h2>Contactez-moi</h2>
      </div>
      <div className="contact-contain">
        <div className="contact-info">
          <div className="contact-info-item">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>gaston.leroy@epitech.eu</span>
          </div>
          <div className="contact-info-item">
            <FontAwesomeIcon icon={faPhone} />
            <span>06 85 42 87 08</span>
          </div>
        </div>
        <form className="contact-form" ref={elementRef} onSubmit={handleSubmit}>
          <div className="contact-form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              className="contact-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="contact-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              className="contact-textarea"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="contact-button">Envoyer</button>
        </form>
      </div>
    </div>
  );
};
