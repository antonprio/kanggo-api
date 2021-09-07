const router = require('express').Router();
const PaymentController = require('../controllers/payment_controller');

router.get('/', PaymentController.getPayments);
router.get('/:id', PaymentController.getPayments);
router.post('/', PaymentController.createPayment);
router.put('/:id', PaymentController.putPayment);
router.delete('/:id', PaymentController.deletePayment);

module.exports = router