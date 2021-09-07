class ErrorHandler extends Error {
  constructor(name, message = 'Internal Server Error') {
    super();
    this.name = name;
    this.message = message;
  }

  static getError(err, req, res, next) {
    let statusCode = null;

    switch (err.name) {
      case 'BadRequest':
        statusCode = 400;
        break;
      case 'SequelizeValidationError':
        statusCode = 400;
        err.message = err.errors[0].message;
        break;
      case 'NotFound':
        statusCode = 404;
        break;
      case 'Unauthorized':
        statusCode = 401;
        break;
      case 'JsonWebTokenError':
        statusCode = 401;
        err.message = 'Invalid token'
        break;
      default:
        statusCode = 500;
        break;
    }

    return res.status(statusCode).json({
      status: 'error',
      message: err.message
    })
  }
};

module.exports = ErrorHandler;