const Category = require('../model/category_model');

// Hàm xử lý tạo danh mục
const createCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        const category = new Category(categoryData);
        category.created_at = new Date();
        category.updated_at = new Date();
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

// Hàm xử lý lấy tất cả danh mục
const getCategories = async (req, res) => {
    const categories = await Category.find().populate('products');
    res.json(categories);
};

const updateCategory = async (req, res) => {
    const categoryId = req.params.id; // Lấy ID của danh mục cần cập nhật
    const updatedData = req.body; // Dữ liệu cập nhật

    try {
        const category = await Category.findByIdAndUpdate(categoryId, updatedData, { new: true });
        if (!category) {
            return res.status(404).json({ error: 'Không tìm thấy danh mục' });
        }
        category.updated_at = new Date();
        await category.save();
        res.json(category);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

// Hàm xử lý xóa danh mục
const deleteCategory = async (req, res) => {
    const categoryId = req.params.id; // Lấy ID của danh mục cần xóa

    try {
        const category = await Category.findByIdAndRemove(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Không tìm thấy danh mục' });
        }
        res.json({ message: 'Danh mục đã bị xóa' });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

const getCategoryById = async (req, res) => {
    const categoryId = req.params.id; // Lấy ID của danh mục cần lấy

    try {
        const category = await Category.findById(categoryId).populate('products');
        if (!category) {
            return res.status(404).json({ error: 'Không tìm thấy danh mục' });
        }
        res.json(category);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory, getCategoryById };
