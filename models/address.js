const Joi = require("joi");

const address = Joi.object({
  id: Joi.string(),
  uid: Joi.string().required(),
  receiver: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
  }).required(),
  address: Joi.string().required(),
  quartier: Joi.string().optional(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().optional(),
  lat: Joi.number(),
  long: Joi.number().optional(),
  isDefault: Joi.boolean().optional(),
});

const addressUpdate = Joi.object({
  receiver: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phoneNumber: Joi.string(),
  }),
  address: Joi.string(),
  quartier: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
  postalCode: Joi.string(),
  lat: Joi.number(),
  long: Joi.number(),
  isDefault: Joi.boolean(),
});

const validateAddress = function (data) {
  const value = address.validate(data);
  return value;
};

const validateAddressUpdate = function (data) {
  const value = addressUpdate.validate(data);
  return value;
};

module.exports = { validateAddress, validateAddressUpdate };
