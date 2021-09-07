const ErrorHandler = require("../middlewares/error_handler");
const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { encodePayload } = require('../helpers/jwt');
const validator = require('validator');

class UserController {
  static register = async function(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const payload = { name, email, password };
      const createUser = await User.create(payload);

      if (createUser) {
        return res.status(201).json({
          status: 'success',
          message: 'Register success',
          data: {
            id: createUser.id,
            email: createUser.email,
          }
        });
      }
    } catch (error) {
      next(error);
    }  
  }

  static login = async function(req, res, next) {
    try {
      const { email, password } = req.body;
      const validateEmail = validator.isEmail(email);
      const options = {
        where: { email }
      };
      const checkUser = await User.findOne(options);

      if (!validateEmail) {
        throw new ErrorHandler('BadRequest', 'Invalid email format');
      }

      if (!email || !password) {
        throw new ErrorHandler('BadRequest', 'invalid username or password');
      }

      if (checkUser) {
        const isValidPassword = comparePassword(password, checkUser.password);
        if (!isValidPassword) {
          throw new ErrorHandler('Unauthorized', 'invalid username or password');
        }
        const payload = {
          user_id: checkUser.id,
          user_email: checkUser.email
        };
        const token = encodePayload(payload);

        return res.status(200).json({
          status: 'ok',
          message: 'Login success', 
          data: {
            access_token: token
          }
        });
      } else {
        throw new ErrorHandler('NotFound', 'email not found');
      }
    } catch (error) {
      console.log('error login', error);
      next(error)
    }
  }
};

module.exports = UserController;