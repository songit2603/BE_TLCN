const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    tensanpham: {
        type: String,
        required: true,
    },
    tensanpham_slug: String,
    soluong: {
        type: Number,
        required: true,
    },
    dongia: {
        type: Number,
        required: true,
    },
    hinhanh: String,
    chienluoc: Number,
    motasanpham: String,
    thongsokythuat: String,
    linkrv: String,
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: Date,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;