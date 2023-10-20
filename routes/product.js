const express = require('express');
const router = express.Router();
const upload = require('../utils/upload')
const productsController = require('../controllers/productController');

// Tạo sản phẩm mới
router.post('/postproduct',upload.single('hinhanh'), productsController.createProduct);

// Lấy tất cả sản phẩm
router.get('/products', productsController.getProducts);

router.get('/productByID/:id', productsController.getProductById);

// Cập nhật sản phẩm theo ID
router.put('/product/:id',upload.single('hinhanh'), productsController.updateProduct);

// Xóa sản phẩm theo ID
router.delete('/product/:id', productsController.deleteProduct);

module.exports = router;