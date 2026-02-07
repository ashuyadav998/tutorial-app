import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo glitch-text">
            <span className="logo-bracket">{'<'}</span>
            TUTORIALES ASHU
            <span className="logo-bracket">{'/>'}</span>
          </Link>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
            <Link to="/tutoriales" onClick={() => setMobileMenuOpen(false)}>Tutoriales</Link>
            
            {isAdmin && (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
            )}

            {user ? (
              <>
                <span className="user-info">👋 {user.username}</span>
                <button onClick={handleLogout} className="btn btn-outline btn-sm" type="button">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn btn-outline btn-sm" type="button">Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
