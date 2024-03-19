const Joi = require("joi");
const userScheme = Joi.object({
  uid: Joi.string().optional(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .pattern(/^\+[1-9]\d{1,14}$/)
    .required(),
  password: Joi.string().min(8).required(),
  imageUrl: Joi.string().default(null),
  roles: Joi.array().items(Joi.string()).min(1).default(["client"]),
  emailVerified: Joi.boolean().default(false),
  phoneVerified: Joi.boolean().default(false),
  disabled: Joi.boolean().default(false),
  createdAt: Joi.date().default(null),
  emailVerifiedAt: Joi.date().default(null),
  phoneVerifiedAt: Joi.date().default(null),
  signedInAt: Joi.date().default(null),
  updatedAt: Joi.date().default(null),
  loggedOutAt: Joi.date().default(null),
});

module.exports = function validateUserData(data) {
  const value = userScheme.validate(data);
  return value;
};
