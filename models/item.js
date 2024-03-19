const Joi = require("joi");

const food = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().required(),
  category: Joi.string().required(),
  subCategory: Joi.string().required(),
  price: Joi.number().required(),
  isCooked: Joi.boolean().required(),
  isAvailable: Joi.boolean().required(),
  quantity: Joi.number().integer().required(),
  description: Joi.string().min(20).required(),
  imagesUrl: Joi.array().items(Joi.string().uri()).default(null),
  flavor: Joi.string().default(null),
  ingredients: Joi.array().items(Joi.string()).default(null),
  type: Joi.string().lowercase().equal("food").required(),
});

const drink = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().required(),
  category: Joi.string().required(),
  subCategory: Joi.string().required(),
  price: Joi.number().required(),
  isAvailable: Joi.boolean().required(),
  quantity: Joi.number().integer().required(),
  description: Joi.string().min(20).required(),
  imagesUrl: Joi.array().items(Joi.string().uri()).default(null),
  flavor: Joi.string().default(null),
  type: Joi.string().lowercase().equal("drink").required(),
  abv: Joi.number().default(null),
});

const itemUpdate = Joi.object({
  name: Joi.string(),
  category: Joi.string(),
  subCategory: Joi.string(),
  price: Joi.number(),
  isAvailable: Joi.boolean(),
  quantity: Joi.number().integer(),
  description: Joi.string().min(20),
  imagesUrl: Joi.array().items(Joi.string().uri()),
  flavor: Joi.string(),
  ingredients: Joi.array().items(Joi.string()),
  abv: Joi.number(),
  isCooked: Joi.boolean(),
});

const validateFood = function (data) {
  const value = food.validate(data);
  return value;
};

const validateDrink = function (data) {
  const value = drink.validate(data);
  return value;
};

const validateItemUpdate = function (data) {
  const value = itemUpdate.validate(data);
  return value;
};

module.exports = {
  validateFood,
  validateItemUpdate,
  validateDrink,
};
