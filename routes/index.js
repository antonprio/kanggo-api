const router = require('express').Router();
const userRoutes = require('./user_route');
const productRoutes = require('./product_route');
const transactionRoutes = require('./transaction_route');
const paymentRoutes = require('./payment_route');
const { authenticateUser } = require('../middlewares/auth');

router.use('/users', userRoutes);
router.use('/products', authenticateUser, productRoutes);
router.use('/transactions', authenticateUser, transactionRoutes);
router.use('/payments', authenticateUser, paymentRoutes);

module.exports = router;