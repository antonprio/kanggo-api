const jwt = require('jsonwebtoken');
const SECRET_KEY = 'rahasia';

const encodePayload = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

const decodePayload = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { encodePayload, decodePayload };