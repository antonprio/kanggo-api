const ErrorHandler = require('./error_handler');
const { decodePayload } = require('../helpers/jwt');
const { User } = require('../models');

async function authenticateUser(req, res, next) {
  try {    
    const token = req.headers.access_token || null
    const encodedToken = decodePayload(token);
    const checkUser = await User.findByPk(encodedToken.user_id);

    if (!checkUser) {
      throw new ErrorHandler('NotFound', 'User not found');
    }

    if (checkUser.id === encodedToken.user_id) {
      req.current_user = encodedToken;
      next();
    }
  } catch (error) {
    next(error)
  }
};

module.exports = { authenticateUser };