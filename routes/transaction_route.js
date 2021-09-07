const router = require('express').Router();
const TransactionController = require('../controllers/transaction_controller');

router.get('/', TransactionController.getLoggedInUserTransaction);
router.post('/', TransactionController.createTransaction);
router.put('/:id', TransactionController.updateTransaction);
router.patch('/:id', TransactionController.patchStatus);
router.delete('/:id', TransactionController.deleteTransaction);

module.exports = router;