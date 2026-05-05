const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/register', productController.registerProduct);

router.get('/', productController.listProducts);

module.exports = router;