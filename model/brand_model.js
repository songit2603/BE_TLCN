const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    tenthuonghieu: {
        type: String,
        required: true,
    },
    tenthuonghieu_slug: String,
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
})
const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;