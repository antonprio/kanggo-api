'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Transaction, { foreignKey: 'order_id' });
    }
  };
  Payment.init({
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'order_id cannot be empty'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['paid', 'pending']],
          msg: 'status must between pending or paid'
        }
      }
    },
    amount: {
      type: DataTypes.DOUBLE,
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
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};