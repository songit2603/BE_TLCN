const Brand = require('../model/brand_model');

//Hàm xử lý tạo thương hiệu sản phẩm
const createBrand =  async(req, res) => {
    try{
        const brandData = req.body;
        const brand = new Brand(brandData);
        brand.updated_at = new Date();
        brand.created_at = new Date();
        await brand.save();
        res.status(201).json(brand);
    } catch (error){
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

//Hàm xử lý tất cả thương hiệu
const getBrands = async (req, res) => {
    const brands = await Brand.find().populate('products');
    res.json(brands);
};

const updateBrand = async (req,res) => {
    const brandId = req.params.id;
    const updateData = req.body;

    try {
        const brand = await Brand.findByIdAndUpdate(brandId, updateBrand, {new: true});
        if(!brand) {
            return res.status(404).json({ error: 'Không tìm thấy thương hiệu'});
        }
        brand.updated_at = new Date();
        await brand.save();
        res.json(brand);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

//Hàm xử lý xóa tên thương hiệu
const deleteBrand = async (req,res) => {
    const brandId = req.params.id; //Lấy id thương hiệu cần xóa

    try {
        const brand = await Brand.findByIdAndUpdate(brandId);
        if(!brand){
            return res.status(404).json({ error: 'Không tìm thấy thương hiệu'});
        }
        res.json({ message: 'Thương hiệu đã bị xóa' });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

const getBrandById = async (req,res) => {
    const brandId = req.params.id;

    try{
        const brand = await Brand.findById(brandId).populate('products');
        if(!brand){
            return res.status(404).json({ error: 'Không tìm thấy thương hiệu'});
        }
        res.json(brand);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

module.exports = {createBrand, getBrands, updateBrand, deleteBrand, getBrandById};