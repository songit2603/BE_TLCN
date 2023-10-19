const Product = require('../model/product_model');
const Category = require('../model/category_model');

// Hàm xử lý tạo sản phẩm
const createProduct = async (req, res) => {
    const { tensanpham, tensanpham_slug, soluong, dongia, hinhanh, chienluoc, motasanpham, thongsokythuat, linkrv, categoryId } = req.body;

    try {
        const product = new Product({ tensanpham, tensanpham_slug, soluong, dongia, hinhanh, chienluoc, motasanpham, thongsokythuat, linkrv, category: categoryId });
        product.created_at = new Date();
        product.updated_at = new Date();
        await product.save();

        const category = await Category.findById(categoryId);
        category.products.push(product);
        await category.save();

        res.status(201).json(product);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

// Hàm xử lý lấy tất cả sản phẩm
const getProducts = async (req, res) => {
    const products = await Product.find().populate('category');
    res.json(products);
};

const updateProduct = async (req, res) => {
    const productId = req.params.id; // Lấy ID của sản phẩm cần cập nhật
    const updatedData = req.body; // Dữ liệu cập nhật

    try {
        const product = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
        }
        product.updated_at = new Date();
        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

// Hàm xử lý xóa sản phẩm
const deleteProduct = async (req, res) => {
    const productId = req.params.id; // Lấy ID của sản phẩm cần xóa

    try {
        const product = await Product.findByIdAndRemove(productId).populate('category');
        if (!product) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
        }
        res.json({ message: 'Sản phẩm đã bị xóa' });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

const getProductById = async (req, res) => {
    const productId = req.params.id; // Lấy ID của sản phẩm cần lấy

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
        }
        res.json(product);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct, getProductById };