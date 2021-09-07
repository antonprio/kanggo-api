const bcrypt = require('bcryptjs');

const hashPassword = (input) => {
  return bcrypt.hashSync(input, 8);
};

const comparePassword = (input, password) => {
  return bcrypt.compareSync(input, password);
};

module.exports = { hashPassword, comparePassword };