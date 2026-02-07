const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  thumbnail: {
    type: String,
    default: null
  },
  tags: [{
    type: String,
    trim: true
  }],
  difficulty: {
    type: String,
    enum: ['principiante', 'intermedio', 'avanzado'],
    default: 'principiante'
  },
  duration: {
    type: Number, // duración en minutos
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Índices para búsqueda
tutorialSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Tutorial', tutorialSchema);
