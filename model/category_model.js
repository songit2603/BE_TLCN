const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    tenloai: {
        type: String,
        required: true,
    },
    tenloai_slug: String,
    hinhanh: String,
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: Date,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;