import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Sobre Mi</h3>
            <p className="footer-text">
              Comparto tutoriales y conocimiento sobre desarrollo web, 
              programación y tecnología.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Enlaces</h3>
            <ul className="footer-links">
              <li><a href="/">Inicio</a></li>
              <li><a href="/tutoriales">Tutoriales</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">¿Te gusta mi contenido?</h3>
            <p className="footer-text mb-3">Apóyame con un café ☕</p>
            <a 
              href="https://Ko-fi.com/ashuyadav74069
" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              ☕ Donar en Ko-fi
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Tutoriales Platform. Hecho con 💙 y mucho ☕</p>
          <div className="footer-tech-stack">
            <span className="tag">React</span>
            <span className="tag">Node.js</span>
            <span className="tag">MongoDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
