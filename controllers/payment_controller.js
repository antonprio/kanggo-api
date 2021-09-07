const ErrorHandler = require('../middlewares/error_handler');
const { Payment, Transaction } = require('../models');

class PaymentController {
  static getPayments = async function(req, res, next) {
    try {
      const paymentId = req.params.id || null;
      let payments = null;
      const filter = {
        include: {
          model: Transaction
        }
      }
      if (!paymentId) {
        payments = await Payment.findAll(filter);

        return res.status(200).json({ status: 'ok', message: 'success', data: payments });
      } else {
        payments = await Payment.findByPk(paymentId, filter);
        if (!payments) throw new ErrorHandler('NotFound', `Payments with id ${paymentId} was not found`);

        return res.status(200).json({ status: 'ok', message: 'success', data: payments });
      }
    } catch (error) {
      next(error);
    }
  };
  
  static createPayment = async function(req, res, next) {
    try {
      const { order_id, amount } = req.body;
      const checkOrder = await Transaction.findByPk(order_id);
      
      if (!checkOrder) {
        throw new ErrorHandler('NotFound', `Transaction with order_id ${order_id} was not found`);
      } else {
        const payload = { order_id, amount };
        const newPayment = await Payment.create(payload);

        return res.status(201).json({ status: 'ok', message: 'Payment Created', data: newPayment });
      }
    } catch (error) {
      next(error);
    }
  };

  static putPayment = async function(req, res, next) {
    try {
      const paymentId = req.params.id;
      const { order_id, amount, status } = req.body;
      const checkPayment = await Payment.findByPk(paymentId);
      
      if (!checkPayment) {
        throw new ErrorHandler('NotFound', `Payment with id ${paymentId} was not found`);
      } else {
        const payload = { order_id, amount, status };
        const options = {
          where: { id: paymentId },
          returning: true
        }
        const newPayment = await Payment.update(payload, options);

        return res.status(200).json({ status: 'ok', message: 'Payment Updated', data: newPayment[1] });
      }
    } catch (error) {
      next(error);
    }
  };

  static deletePayment = async function(req, res, next) {
    try {
      const paymentId = req.params.id;
      const checkPayment = await Payment.findByPk(paymentId);
      
      if (!checkPayment) {
        throw new ErrorHandler('NotFound', `Payment with id ${paymentId} was not found`);
      } else {
        const options = {
          where: { id: paymentId },
        }
        const newPayment = await Payment.destroy(options);

        return res.status(200).json({ status: 'ok', message: 'Payment Deleted' });
      }
    } catch (error) {
      next(error);
    }
  };
};

module.exports = PaymentController;