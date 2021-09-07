'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
      Transaction.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  };
  Transaction.init({
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'user_id cannot be empty'
        }
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'product_id cannot be empty'
        }
      }
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'amount cannot be empty'
        },
        min: {
          args: 1,
          msg: 'amount must above 0'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['pending', 'paid']],
          msg: 'Status must between pending or paid'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};