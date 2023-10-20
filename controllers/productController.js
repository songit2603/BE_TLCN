const Product = require('../model/product_model');
const Category = require('../model/category_model');
const cloudinary = require('../utils/cloundinary')


// Hàm xử lý tạo sản phẩm
const createProduct = async (req, res) => {
    const { tensanpham, tensanpham_slug, soluong, dongia, chienluoc, motasanpham, thongsokythuat, linkrv, categoryId } = req.body;
    const hinhanh = req.file.path;
    try {
        const result = await cloudinary.uploader.upload(hinhanh, {
            folder: "products"
        })

        const product = new Product({ 
            tensanpham, 
            tensanpham_slug, 
            soluong, 
            dongia, 
            hinhanh: {
                public_id: result.public_id,
                url: result.url
            }, 
            chienluoc, 
            motasanpham, 
            thongsokythuat, 
            linkrv, 
            category: categoryId 
        });
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
const deleteImageFromCloudinary = async (publicId) => {
    try {
      await cloudinary.uploader.destroy(publicId);
      console.log('Xóa hình ảnh từ Cloudinary thành công');
    } catch (error) {
      console.error('Lỗi khi xóa hình ảnh từ Cloudinary:', error);
    }
};
const updateProduct = async (req, res) => {
    const productId = req.params.id; // Lấy ID của sản phẩm cần cập nhật
    const updatedData = req.body; // Dữ liệu cập nhật

    try {
        const product = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
        }
        await deleteImageFromCloudinary(product.hinhanh.public_id);

        // Tải lên hình ảnh mới lên Cloudinary từ đường dẫn req.file.path
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "products"
        });
        product.hinhanh = {
            public_id: result.public_id,
            url: result.url
        };
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
        await deleteImageFromCloudinary(product.hinhanh.public_id);
        // Lấy danh mục của sản phẩm
        const categoryId = product.category;

        // Xóa sản phẩm khỏi danh sách sản phẩm (products) của danh mục
        const category = await Category.findById(categoryId);
        if (category) {
            category.products.pull(productId);
            await category.save();
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