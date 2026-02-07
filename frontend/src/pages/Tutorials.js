import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Tutorials.css';

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchCategories();
    fetchTutorials();
  }, [selectedCategory, selectedDifficulty]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      setCategories(res.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const fetchTutorials = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedDifficulty) params.append('difficulty', selectedDifficulty);
      if (searchTerm) params.append('search', searchTerm);

      const res = await axios.get(`${API_URL}/tutorials?${params.toString()}`);
      setTutorials(res.data.tutorials);
    } catch (error) {
      console.error('Error al cargar tutoriales:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTutorials();
  };

  return (
    <div className="tutorials-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title glitch-text">
            <span className="title-bracket">{'<'}</span>
            Todos los Tutoriales
            <span className="title-bracket">{'/>'}</span>
          </h1>
          <p className="page-subtitle">
            Explora nuestra colección de tutoriales sobre desarrollo web y programación
          </p>
        </div>

        {/* Filters */}
        <div className="filters-section card">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Buscar tutoriales..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="btn btn-primary">
              🔍 Buscar
            </button>
          </form>

          <div className="filters-grid">
            <div className="filter-group">
              <label>Categoría:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">Todas</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Dificultad:</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="filter-select"
              >
                <option value="">Todas</option>
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </select>
            </div>
          </div>

          {(selectedCategory || selectedDifficulty || searchTerm) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('');
                setSelectedDifficulty('');
                setSearchTerm('');
              }}
              className="btn btn-outline btn-sm"
            >
              Limpiar Filtros
            </button>
          )}
        </div>

        {/* Tutorials Grid */}
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
          </div>
        ) : tutorials.length === 0 ? (
          <div className="no-results card">
            <h3>😕 No se encontraron tutoriales</h3>
            <p>Intenta con otros filtros o búsqueda</p>
          </div>
        ) : (
          <>
            <div className="results-count">
              <span className="tag">{tutorials.length} tutoriales encontrados</span>
            </div>
            <div className="grid grid-3">
              {tutorials.map((tutorial) => (
                <TutorialCard key={tutorial._id} tutorial={tutorial} />
              ))}
            </div>
          </>
        )}
      </div>
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
          <span className={`difficulty-badge difficulty-${tutorial.difficulty}`}>
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

export default Tutorials;
