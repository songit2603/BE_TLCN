const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categoryController');

// Tạo danh mục mới
router.post('/postcategory', categoriesController.createCategory);

// Lấy tất cả danh mục
router.get('/categories', categoriesController.getCategories);

router.get('/categoryById/:id', categoriesController.getCategoryById);

// Cập nhật danh mục theo ID
router.put('/categories/:id', categoriesController.updateCategory);

// Xóa danh mục theo ID
router.delete('/categories/:id', categoriesController.deleteCategory);

module.exports = router;