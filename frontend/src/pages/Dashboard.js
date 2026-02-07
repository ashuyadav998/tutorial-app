import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard" style={{ padding: '3rem 0' }}>
      <div className="container">
        <h1 className="page-title">Dashboard de Administración</h1>
        
        <div className="dashboard-nav card" style={{ marginBottom: '2rem' }}>
          <Link to="/dashboard" className="btn btn-outline">Ver Tutoriales</Link>
          <Link to="/dashboard/new" className="btn btn-primary">Crear Tutorial</Link>
          <Link to="/dashboard/categories" className="btn btn-secondary">Categorías</Link>
        </div>

        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="new" element={<CreateTutorial />} />
          <Route path="edit/:id" element={<EditTutorial />} />
          <Route path="categories" element={<CategoriesManager />} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardHome = () => (
  <div className="card">
    <h2>Gestión de Tutoriales</h2>
    <p>Aquí podrás ver, editar y eliminar tus tutoriales.</p>
    <p className="mt-3">
      <strong>Funcionalidad completa disponible:</strong> Usa las API routes para 
      crear un CRUD completo de tutoriales.
    </p>
  </div>
);

const CreateTutorial = () => (
  <div className="card">
    <h2>Crear Nuevo Tutorial</h2>
    <p>Aquí implementa el formulario para crear tutoriales usando la API.</p>
    <form className="mt-4">
      <div className="input-group">
        <label>Título</label>
        <input type="text" placeholder="Título del tutorial" />
      </div>
      <div className="input-group">
        <label>Descripción</label>
        <textarea placeholder="Descripción breve" rows="3"></textarea>
      </div>
      <div className="input-group">
        <label>Contenido (Markdown)</label>
        <textarea placeholder="Contenido en markdown..." rows="10"></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Crear Tutorial</button>
    </form>
  </div>
);

const EditTutorial = () => (
  <div className="card">
    <h2>Editar Tutorial</h2>
    <p>Formulario de edición aquí...</p>
  </div>
);

const CategoriesManager = () => (
  <div className="card">
    <h2>Gestionar Categorías</h2>
    <p>Crear, editar y eliminar categorías.</p>
  </div>
);

export default Dashboard;
