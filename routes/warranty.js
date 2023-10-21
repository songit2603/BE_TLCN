const express = require('express');
const router = express.Router();

const warrantiesController = require('../controllers/warrantyController');

//Tạo thông tin bảo hành mới
router.post('/postwarranty', warrantiesController.createWarranty);

//Lấy tất cả thông tin bảo hành
router.get('/warranties', warrantiesController.getWarranties);

router.get('/warrantyById/:id', warrantiesController.getWarrantyById);

//Cập nhật thông tin bảo hành theo ID
router.put('/warranties/:id', warrantiesController.updateWarranty);

//Xóa thông tin bảo hành
router.delete('/warranties/:id', warrantiesController.deleteWarranty);

module.exports = router;