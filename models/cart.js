const Joi = require("joi");

const cart = Joi.object({
  id: Joi.string(),
  uid: Joi.string().required(),
  itemID: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().integer().min(1).required(),
  type: Joi.string().lowercase().valid("food", "drink").required(),
});

const cartUpdate = Joi.object({ quantity: Joi.number().integer().min(1) });

const validateCart = function (data) {
  const value = cart.validate(data);
  return value;
};

const validateCartUpdate = function (data) {
  const value = cartUpdate.validate(data);
  return value;
};

module.exports = {
  validateCart,
  validateCartUpdate,
};
