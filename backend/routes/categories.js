const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/categories
// @desc    Obtener todas las categorías
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías', details: error.message });
  }
});

// @route   GET /api/categories/:slug
// @desc    Obtener categoría por slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categoría', details: error.message });
  }
});

// @route   POST /api/categories
// @desc    Crear nueva categoría
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, description, icon, color } = req.body;
    
    const slug = name.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const category = await Category.create({
      name,
      slug,
      description,
      icon,
      color
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear categoría', details: error.message });
  }
});

// @route   PUT /api/categories/:id
// @desc    Actualizar categoría
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { name, description, icon, color } = req.body;
    
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    if (name) {
      category.name = name;
      category.slug = name.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    }
    if (description !== undefined) category.description = description;
    if (icon) category.icon = icon;
    if (color) category.color = color;

    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar categoría', details: error.message });
  }
});

// @route   DELETE /api/categories/:id
// @desc    Eliminar categoría
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    await category.deleteOne();
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar categoría', details: error.message });
  }
});

module.exports = router;
