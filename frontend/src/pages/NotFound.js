import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '6rem', marginBottom: '1rem' }}>404</h1>
        <h2 style={{ marginBottom: '1rem' }}>Página no encontrada</h2>
        <p style={{ color: 'var(--light)', marginBottom: '2rem' }}>
          La página que buscas no existe o ha sido movida.
        </p>
        <Link to="/" className="btn btn-primary">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
