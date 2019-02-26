const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require ('../middleware/check-auth');

const ProductController = require('../controller/products');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
//  reject file
  if (file.mimeType === 'image/jpeg' || file.mimeType === 'image/png'){
    cb(null, true)
  }else {
    cb(null, false)
  }
};

const upload = multer({storage: storage, limits:{
  fileSize: 1024 * 1024 * 5,
  fileFilter : fileFilter
  }});

/*Get All Product*/
router.get('/', ProductController.products_get_all);

/*post product with upload image*/
router.post('/', checkAuth, upload.single('productImage'), ProductController.products_create_product);

/*get product By Id*/
router.get('/:productId', ProductController.products_get_product);

/*Update product Controller*/
router.patch('/:productId', checkAuth, ProductController.products_update_product);

/*Delete product*/
router.delete('/:productId', checkAuth, ProductController.products_delete_product);

module.exports = router;