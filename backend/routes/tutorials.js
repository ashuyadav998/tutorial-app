const express = require('express');
const router = express.Router();
const Tutorial = require('../models/Tutorial');
const { protect, admin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configurar multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten imágenes'));
  }
});

// @route   GET /api/tutorials
// @desc    Obtener todos los tutoriales publicados
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, search, page = 1, limit = 12 } = req.query;
    
    let query = { published: true };
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$text = { $search: search };
    }

    const tutorials = await Tutorial.find(query)
      .populate('category', 'name slug icon color')
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Tutorial.countDocuments(query);

    res.json({
      tutorials,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tutoriales', details: error.message });
  }
});

// @route   GET /api/tutorials/:slug
// @desc    Obtener tutorial por slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const tutorial = await Tutorial.findOne({ slug: req.params.slug })
      .populate('category', 'name slug icon color')
      .populate('author', 'username avatar');

    if (!tutorial) {
      return res.status(404).json({ error: 'Tutorial no encontrado' });
    }

    // Incrementar vistas
    tutorial.views += 1;
    await tutorial.save();

    res.json(tutorial);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tutorial', details: error.message });
  }
});

// @route   POST /api/tutorials
// @desc    Crear nuevo tutorial
// @access  Private/Admin
router.post('/', protect, admin, upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, description, content, category, tags, difficulty, duration, published } = req.body;

    // Generar slug
    const slug = title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const tutorial = await Tutorial.create({
      title,
      slug,
      description,
      content,
      category,
      tags: tags ? JSON.parse(tags) : [],
      difficulty,
      duration,
      published: published === 'true',
      thumbnail: req.file ? `/uploads/${req.file.filename}` : null,
      author: req.user._id
    });

    res.status(201).json(tutorial);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tutorial', details: error.message });
  }
});

// @route   PUT /api/tutorials/:id
// @desc    Actualizar tutorial
// @access  Private/Admin
router.put('/:id', protect, admin, upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, description, content, category, tags, difficulty, duration, published } = req.body;

    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) {
      return res.status(404).json({ error: 'Tutorial no encontrado' });
    }

    // Actualizar campos
    if (title) {
      tutorial.title = title;
      tutorial.slug = title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    }
    if (description) tutorial.description = description;
    if (content) tutorial.content = content;
    if (category) tutorial.category = category;
    if (tags) tutorial.tags = JSON.parse(tags);
    if (difficulty) tutorial.difficulty = difficulty;
    if (duration) tutorial.duration = duration;
    if (published !== undefined) tutorial.published = published === 'true';
    if (req.file) tutorial.thumbnail = `/uploads/${req.file.filename}`;

    await tutorial.save();
    res.json(tutorial);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tutorial', details: error.message });
  }
});

// @route   DELETE /api/tutorials/:id
// @desc    Eliminar tutorial
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) {
      return res.status(404).json({ error: 'Tutorial no encontrado' });
    }

    await tutorial.deleteOne();
    res.json({ message: 'Tutorial eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tutorial', details: error.message });
  }
});

module.exports = router;
