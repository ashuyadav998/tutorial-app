const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verificar token JWT
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'No autorizado, token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: 'No autorizado, token inválido' });
  }
};

// Verificar rol de administrador
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Acceso denegado - Se requiere rol de administrador' });
  }
};
