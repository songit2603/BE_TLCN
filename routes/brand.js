const express = require('express');
const router = express.Router();

const brandsController =  require('../controllers/brandController');

//Tạo thông tin thương hiệu mới
router.post('/postbrand', brandsController.createBrand);

//Lấy tất cả thông tin thương hiệu
router.get('/brands', brandsController.getBrands);

router.get('/brands/:id', brandsController.getBrandById);

//Cập nhập thông tin bảo hành theo ID
router.put('/brands/:id',brandsController.updateBrand);

//Xóa thương hiệu
router.delete('/brands/:id', brandsController.deleteBrand);

module.exports = router;   