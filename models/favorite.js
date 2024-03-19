const Joi = require("joi");

const favorite = Joi.object({
  id: Joi.string(),
  itemID: Joi.string().required(),
  userID: Joi.string().required(),
});

const validateFavorite = function (data) {
  const value = favorite.validate(data);
  return value;
};

module.exports = { validateFavorite };
