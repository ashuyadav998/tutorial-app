import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const TutorialDetail = () => {
  const { slug } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchTutorial();
  }, [slug]);

  const fetchTutorial = async () => {
    try {
      const res = await axios.get(`${API_URL}/tutorials/${slug}`);
      setTutorial(res.data);
    } catch (error) {
      console.error('Error al cargar tutorial:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <div className="card text-center">
          <h2>Tutorial no encontrado</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <article className="tutorial-detail card">
        <header>
          <span className="tag">{tutorial.category?.name}</span>
          <h1>{tutorial.title}</h1>
          <p className="tutorial-description">{tutorial.description}</p>
          <div className="tutorial-meta" style={{ marginTop: '1.5rem' }}>
            <span>⏱ {tutorial.duration} min</span>
            <span>👁 {tutorial.views} vistas</span>
            <span className={`difficulty-badge difficulty-${tutorial.difficulty}`}>
              {tutorial.difficulty}
            </span>
          </div>
        </header>
        <div className="tutorial-content" style={{ marginTop: '3rem' }}>
          <ReactMarkdown>{tutorial.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default TutorialDetail;
