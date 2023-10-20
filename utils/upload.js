const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloundinary')
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    // params: {
    //   folder: 'products', // Thay đổi tên thư mục tùy theo nhu cầu
    // },
  });
  
  const upload = multer({ storage: storage });

module.exports = upload