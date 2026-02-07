const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
    default: ''
  },
  icon: {
    type: String,
    default: '📚'
  },
  color: {
    type: String,
    default: '#3b82f6'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
