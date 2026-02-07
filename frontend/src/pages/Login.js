import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('✅ Formulario enviado:', { email, password, username });

    try {
      let result;
      if (isLogin) {
        console.log('🔐 Intentando login...');
        result = await login(email, password);
      } else {
        console.log('📝 Intentando registro...');
        result = await register(username, email, password);
      }

      console.log('📊 Resultado:', result);

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('❌ Error en submit:', err);
      setError('Error en el servidor');
    } finally {
      setLoading(false);
    }
  };

  // Estilos inline
  const containerStyle = {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    padding: '4rem 0',
  };

  const cardStyle = {
    background: '#1A1A2E',
    border: '3px solid #EAEAEA',
    padding: '3rem',
    maxWidth: '500px',
    margin: '0 auto',
    boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.9)',
    position: 'relative',
    zIndex: '1000',
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    fontFamily: 'monospace',
    fontSize: '1rem',
    background: '#0F0F1E',
    color: '#EAEAEA',
    border: '3px solid #EAEAEA',
    marginBottom: '1rem',
    position: 'relative',
    zIndex: '1000',
    pointerEvents: 'auto',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '1.2rem',
    fontFamily: 'monospace',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    background: '#FF6B35',
    color: 'white',
    border: '3px solid #0F0F1E',
    cursor: 'pointer',
    boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.9)',
    position: 'relative',
    zIndex: '1000',
    pointerEvents: 'auto',
  };

  const errorStyle = {
    padding: '1rem',
    marginBottom: '1rem',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '2px solid #EF4444',
    color: '#EF4444',
    fontFamily: 'monospace',
  };

  console.log('🎨 Login renderizado. Estado:', { isLogin, email: email.length, password: password.length });

  return (
    <div style={containerStyle}>
      <div className="container">
        <div style={cardStyle}>
          <h1 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#EAEAEA' }}>
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </h1>
          <p style={{ textAlign: 'center', color: '#EAEAEA', marginBottom: '2rem' }}>
            {isLogin ? 'Accede al panel de administración' : 'Crea tu cuenta'}
          </p>

          {error && <div style={errorStyle}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: '1000' }}>
            {!isLogin && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#EAEAEA' }}>
                  Usuario
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    console.log('✏️ Username:', e.target.value);
                    setUsername(e.target.value);
                  }}
                  placeholder="tucoolnombre"
                  style={inputStyle}
                  autoComplete="off"
                />
              </div>
            )}

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#EAEAEA' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  console.log('✉️ Email:', e.target.value);
                  setEmail(e.target.value);
                }}
                onClick={() => console.log('🖱️ Click en email')}
                onFocus={() => console.log('🎯 Focus en email')}
                placeholder="admin@tutoriales.com"
                style={inputStyle}
                autoComplete="off"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#EAEAEA' }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  console.log('🔑 Password length:', e.target.value.length);
                  setPassword(e.target.value);
                }}
                onClick={() => console.log('🖱️ Click en password')}
                onFocus={() => console.log('🎯 Focus en password')}
                placeholder="admin123"
                style={inputStyle}
                autoComplete="off"
              />
            </div>

            <button type="submit" style={buttonStyle} disabled={loading}>
              {loading ? 'Procesando...' : (isLogin ? 'Entrar' : 'Registrarse')}
            </button>
          </form>

          <div style={{ 
            textAlign: 'center', 
            padding: '1.5rem 0', 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            marginTop: '2rem',
            color: '#EAEAEA'
          }}>
            {isLogin ? (
              <p>
                ¿No tienes cuenta?{' '}
                <button 
                  type="button"
                  onClick={() => {
                    console.log('🔄 Cambio a registro');
                    setIsLogin(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#00E5FF',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Regístrate aquí
                </button>
              </p>
            ) : (
              <p>
                ¿Ya tienes cuenta?{' '}
                <button 
                  type="button"
                  onClick={() => {
                    console.log('🔄 Cambio a login');
                    setIsLogin(true);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#00E5FF',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Inicia sesión
                </button>
              </p>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/">← Volver</Link>
          </div>

          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            background: '#00E5FF', 
            color: '#0F0F1E' 
          }}>
            <strong>💡 Credenciales:</strong><br />
            admin@tutoriales.com / admin123
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
