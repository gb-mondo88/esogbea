const Joi = require("joi");

const tableScheme = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().default(null),
  capacity: Joi.number().integer().min(1).required(),
  location: Joi.string().default(null),
  description: Joi.string().default(null),
  isAvailable: Joi.boolean().default(true),
});

const tableUpdateScheme = Joi.object({
  name: Joi.string().optional(),
  capacity: Joi.number().integer().min(1).optional(),
  location: Joi.string().optional(),
  description: Joi.string().optional(),
  isAvailable: Joi.boolean().optional(),
});

const validateTableData = function (data) {
  const value = tableScheme.validate(data);
  return value;
};

const validateTableUpdateData = function (data) {
  const value = tableUpdateScheme.validate(data);
  return value;
};

module.exports = { validateTableData, validateTableUpdateData };
