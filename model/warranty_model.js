const mongoose = require('mongoose');

const warrantySchema = new mongoose.Schema({
    tenloai: {
        type: String,
        required: true,
    },
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
const Warranty = mongoose.model('Warranty', warrantySchema);

module.exports = Warranty;