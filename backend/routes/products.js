const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// GET /api/products - get all products with optional filter
router.get('/', (req, res) => {
  const { category, sort, search } = req.query;
  let result = [...products];

  if (category && category !== 'Semua Produk') {
    result = result.filter(p => p.category === category);
  }

  if (search) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === 'Termurah') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'Termahal') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'Terlaris') {
    result.sort((a, b) => b.sold - a.sold);
  } else {
    // Default: Terbaru (by id desc)
    result.sort((a, b) => b.id - a.id);
  }

  res.json({ success: true, data: result, total: result.length });
});

// GET /api/products/:id - get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
  }
  res.json({ success: true, data: product });
});

module.exports = router;
