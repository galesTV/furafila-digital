const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rota para cadastrar um novo produto
router.post('/register', productController.registerProduct);

// Rota para listar todos os produtos
router.get('/', productController.listProducts);

module.exports = router;