const express = require('express');
const multer = require('multer');
const productController = require('../controllers/productController');
const { validateProduct, validateFile } = require('../middleware/validators');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.post('/products', upload.single('image'), validateProduct, validateFile, productController.createProduct);
router.put('/products/:id', upload.single('image'), validateProduct, validateFile, productController.updateProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
