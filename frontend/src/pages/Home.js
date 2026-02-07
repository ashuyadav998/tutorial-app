import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [latestTutorials, setLatestTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchLatestTutorials();
  }, []);

  const fetchLatestTutorials = async () => {
    try {
      const res = await axios.get(`${API_URL}/tutorials?limit=3`);
      setLatestTutorials(res.data.tutorials);
    } catch (error) {
      console.error('Error al cargar tutoriales:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in-up">
            <div className="hero-badge">
              <span className="badge-icon">🚀</span>
              <span>Aprende · Crea · Comparte</span>
            </div>
            
            <h1 className="hero-title glitch-text">
              Tutoriales de
              <span className="highlight"> Desarrollo Web</span>
            </h1>
            
            <p className="hero-description">
              Aprende programación, desarrollo web y tecnología con tutoriales 
              prácticos y actualizados. Desde principiantes hasta avanzados.
            </p>

            <div className="hero-actions">
              <Link to="/tutoriales" className="btn btn-primary">
                Ver Tutoriales
              </Link>
              <a 
                href="https://Ko-fi.com/ashuyadav74069" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                ☕ Apóyame
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Tutoriales</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Lectores</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Gratis</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="code-window">
              <div className="window-header">
                <span className="window-dot red"></span>
                <span className="window-dot yellow"></span>
                <span className="window-dot green"></span>
              </div>
              <div className="window-content">
                <pre><code>{`function aprender() {
  const tutorial = leerContenido();
  const practica = aplicarConcepto();
  
  if (practica) {
    return '🎉 Conocimiento++';
  }
  
  return seguirAprendiendo();
}`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Tutorials */}
      <section className="latest-tutorials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-bracket">{'['}</span>
              Últimos Tutoriales
              <span className="title-bracket">{']'}</span>
            </h2>
            <Link to="/tutoriales" className="btn btn-outline">
              Ver Todos →
            </Link>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="grid grid-3">
              {latestTutorials.map((tutorial) => (
                <TutorialCard key={tutorial._id} tutorial={tutorial} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2 className="section-title text-center mb-5">
            ¿Por qué estos tutoriales?
          </h2>

          <div className="grid grid-3">
            <div className="feature-card card">
              <div className="feature-icon">📚</div>
              <h3>Contenido Práctico</h3>
              <p>Tutoriales paso a paso con ejemplos reales que puedes aplicar inmediatamente.</p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">🎯</div>
              <h3>Siempre Actualizado</h3>
              <p>Contenido revisado y actualizado con las últimas tecnologías y mejores prácticas.</p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">💡</div>
              <h3>100% Gratis</h3>
              <p>Todo el contenido es completamente gratuito. Aprende sin barreras.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card card">
            <h2 className="cta-title">¿Te gusta el contenido?</h2>
            <p className="cta-description">
              Si estos tutoriales te han ayudado, considera apoyarme con un café ☕
              para seguir creando más contenido de calidad.
            </p>
            <a 
              href="https://Ko-fi.com/ashuyadav74069
" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              ☕ Invítame un Café
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const TutorialCard = ({ tutorial }) => {
  return (
    <Link to={`/tutorial/${tutorial.slug}`} className="tutorial-card card">
      <div 
        className="tutorial-thumbnail"
        style={{
          backgroundColor: tutorial.category?.color || '#3b82f6',
          background: `linear-gradient(135deg, ${tutorial.category?.color || '#3b82f6'} 0%, ${tutorial.category?.color || '#3b82f6'}dd 100%)`
        }}
      >
        <span className="tutorial-category-icon">
          {tutorial.category?.icon || '📚'}
        </span>
      </div>
      
      <div className="tutorial-content">
        <div className="tutorial-meta">
          <span className="tag">{tutorial.category?.name}</span>
          <span className="difficulty-badge difficulty-{tutorial.difficulty}">
            {tutorial.difficulty}
          </span>
        </div>
        
        <h3 className="tutorial-title">{tutorial.title}</h3>
        <p className="tutorial-description">{tutorial.description}</p>
        
        <div className="tutorial-footer">
          <span className="tutorial-duration">⏱ {tutorial.duration} min</span>
          <span className="tutorial-views">👁 {tutorial.views} vistas</span>
        </div>
      </div>
    </Link>
  );
};

export default Home;
