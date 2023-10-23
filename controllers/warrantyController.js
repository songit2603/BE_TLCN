const Warranty = require('../model/warranty_model');

//Hàm xử lý tạo mục bảo hành
const createWarranty = async (req, res) => {
    try {
        const warrantyData = req.body;
        const warranty = new Warranty(warrantyData);
        warranty.updated_at = new Date();
        warranty.created_at = new Date();
        await warranty.save();
        res.status(201).json(warranty);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

//Hàm xử lý tất cả mục bảo hành
const getWarranties = async (req, res) => {
    const warranties = await Warranty.find().populate('products');
    res.json(warranties);
};

const updateWarranty = async (req, res) => {
    const warrantyId = req.params.id;
    const updatedData = req.body;

    try {
        const warranty = await Warranty.findByIdAndUpdate(warrantyId,updatedData, {new: true});
        if(!warranty) {
            return res.status(404).json({ error: 'Không tìm thấy mục bảo hành'});
        }
        warranty.updated_at = new Date();
        await warranty.save();
        res.json(warranty);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

//Hàm xử lý xóa thông tin bảo hành
const deleteWarranty = async (req, res) => {
    const warrantyId = req.params.id; // Lấy id bảo hành cần xóa

    try {
        const warranty = await Warranty.findByIdAndUpdate(warrantyId);
        if(!warranty){
            return res.status(404).json({ error: 'Không tìm thấy mục bảo hành'});
        }
        res.json({ message: 'Thông tin bảo hành đã bị xóa' });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

const getWarrantyById = async (req,res) => {
    const warrantyId = req.params.id;

    try{
        const warranty = await Warranty.findById(warrantyId).populate('products');
        if(!warranty) {
            return res.status(404).json({ error: 'Không tìm thấy thông tin bảo hành' });
        }
        res.json(category);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

module.exports = {createWarranty, getWarranties, updateWarranty, deleteWarranty, getWarrantyById};
