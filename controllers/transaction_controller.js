const ErrorHandler = require('../middlewares/error_handler');
const { Transaction, Product, User } = require('../models');

class TransactionController {
  static getLoggedInUserTransaction = async function(req, res, next) {
    try {
      const { user_id } = req.current_user;
      const filter = {
        include: [
          {
            model: User,
            attributes: ['id', 'email']
          },
          {
            model: Product
          }
        ],
        where: { user_id },
      };
      const transactions = await Transaction.findAll(filter);
      
      return res.status(200).json({ status: 'ok', message: 'success', data: transactions });
    } catch (error) {
      next(error);
    }
  }

  static createTransaction = async function(req, res, next) {
    try {
      const { product_id, amount } = req.body;
      const checkProduct = await Product.findByPk(product_id);

      if (!checkProduct) {
        throw new ErrorHandler('NotFound', `Product with id ${product_id} not found`);
      } else {
        const { user_id } = req.current_user
        const payload = { product_id, amount, user_id };
        const newProduct = await Transaction.create(payload);

        return res.status(201).json({ status: 'ok', message: 'Transaction Created', data: newProduct });
      }
    } catch (error) {
      next(error);
    }
  }

  static updateTransaction = async function(req, res, next) {
    try {
      const transactionId = req.params.id;
      const checkTransaction = await Transaction.findByPk(transactionId);
      const { product_id, amount } = req.body;

      if (!checkTransaction) {
        throw new ErrorHandler('NotFound', `Transaction with id ${transactionId} was not found`);
      } else {
        const { user_id } = req.current_user;
        const payload = { user_id, product_id, amount };
        const options = {
          where: { order_id: transactionId },
          returning: true
        }
        const updatedTransaction = await Transaction.update(payload, options);

        return res.status(200).json({ status: 'ok', message: 'Transaction Updated', data: updatedTransaction[1]});
      }
    } catch (error) {
      next(error);
    }
  }

  static deleteTransaction = async function(req, res, next) {
    try {
      const transactionId = req.params.id;
      const checkTransaction = await Transaction.findByPk(transactionId);

      if (!checkTransaction) {
        throw new ErrorHandler('NotFound', `Transaction with id ${transactionId} was not found`);
      } else {
        const options = {
          where: { order_id: transactionId }
        };
        await Transaction.destroy(options);

        return res.status(200).json({ status: 'ok', message: 'Delete Success' });
      }
    } catch (error) {
      next(error);
    }
  }

  static patchStatus = async function(req, res, next) {
    try {
      const transactionId = req.params.id;
      const checkTransaction = await Transaction.findByPk(transactionId);
      const { status } = req.body;

      if (!checkTransaction) {
        throw new ErrorHandler('NotFound', `Transaction with id ${transactionId} was not found`);
      } else {
        const payload = { status };
        const options = {
          where: { order_id: transactionId },
          returning: true
        }
        const updatedTransaction = await Transaction.update(payload, options);

        return res.status(200).json({ status: 'ok', message: 'Transaction Updated', data: updatedTransaction[1]});
      }
    } catch (error) {
      next(error);
    }
  }
};

module.exports = TransactionController;