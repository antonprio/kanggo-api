const e = require('express');
const ErrorHandler = require('../middlewares/error_handler');
const { Product } = require('../models');

class ProductController {
  static createProduct = async function(req, res, next) {
    try {
      const { name, price, qty } = req.body;
      const payload = { name, price, qty };
      const newProduct = await Product.create(payload);

      if (newProduct) {
        res.status(201).json({
          status: 'ok',
          message: 'Product Created',
          data: newProduct
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static getProducts = async function(req, res, next) {
    try {
      const productId = req.params.id || null;
      let product = null;

      if (!productId) {
        product = await Product.findAll();
      } else {
        product = await Product.findByPk(productId);
        if (!product) throw new ErrorHandler('NotFound', `Product with id ${productId} was not found`);
      }

      return res.status(200).json({ status: 'ok', data: product });
    } catch (error) {
      next(error);
    }
  }

  static updateProduct = async function(req, res, next) {
    try {
      const productId = req.params.id;
      const checkProduct = await Product.findByPk(productId);
      const payload = {
        name: req.body.name,
        price: req.body.price,
        qty: req.body.qty,
      };

      if (!checkProduct) {
        throw new ErrorHandler('NotFound', `Product with id ${productId} not found`);
      } else {
        const options = {
          where: { id: productId },
          returning: true,
        };
        const updatedProduct = await Product.update(payload, options);

        return res.status(200).json({
          status: 'ok',
          message: 'Update Success',
          data: updatedProduct[1]
        });
      }
    } catch (error) {
      next(error)
    }
  }

  static deleteProduct = async function(req, res, next) {
    try {
      const productId = req.params.id;
      const checkProduct = await Product.findByPk(productId);

      if (!checkProduct) {
        throw new ErrorHandler('NotFound', `Product id ${productId} was not found`);
      } else {
        const options = {
          where: { id: productId }
        }
        await Product.destroy(options);
      }
      
      return res.status(200).json({ status: 'ok', message: 'Delete Success' });
    } catch (error) {
      next(error)
    }
  }
};

module.exports = ProductController