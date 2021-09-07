const router = require('express').Router();
const ProductController = require('../controllers/product_controller');

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProducts);
router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;