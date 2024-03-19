const itemExists = function (objArray, objField, value) {
  return objArray.some((obj) => obj[objField] === value);
};

module.exports = itemExists;
