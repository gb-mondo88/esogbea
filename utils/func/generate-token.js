const jwt = require("jsonwebtoken");

const generateToken = function (dataObj) {
  const expiresIn = 3600;
  const token = jwt.sign(dataObj, process.env.JWT_SECRET, { expiresIn });
  return token;
};

module.exports = generateToken;
