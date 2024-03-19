const Joi = require("joi");

const orderScheme = Joi.object({
  id: Joi.string(),
  uid: Joi.string().required(),
  status: Joi.string()
    .valid("pending", "completed", "cancelled", "confirmed")
    .default("pending"),
  totalItemsPrice: Joi.number().optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
  items: Joi.array()
    .items(
      Joi.object({
        itemID: Joi.string().required(),
        itemType: Joi.string().required(),
        quantity: Joi.string().required(),
      })
    )
    .min(1)
    .optional(),
  deliveryRequested: Joi.boolean().required(),
  deliveryDetails: Joi.when("deliveryRequested", {
    is: true,
    then: Joi.object({
      deliveryDate: Joi.date().required(),
      deliveryPrice: Joi.number().optional(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
    }).required(),

    otherwise: Joi.object({
      deliveryDate: Joi.date().default(null),
      deliveryPrice: Joi.number().default(null),
      address: Joi.string().default(null),
      city: Joi.string().default(null),
      country: Joi.string().default(null),
    }).default(),
  }),
  paymentDetails: Joi.object({
    method: Joi.string()
      .valid("cash", "credit_card", "tmoney", "flooz")
      .default("cash"),
    status: Joi.string().valid("paid", "not_paid").default("not_paid"),
    currency: Joi.string().valid("FCFA", "XOF").default("FCFA"),
    totalAmountPaid: Joi.number().default(0.0),
    paymentDate: Joi.date().default(null),
    note: Joi.string().default(null),
  }).default(),
});

const orderUpdateScheme = Joi.object({
  userID: Joi.string().optional(),
  status: Joi.string().valid("pending", "completed", "cancelled"),
  totalItemsPrice: Joi.number().optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
  items: Joi.array()
    .items(
      Joi.object({
        itemID: Joi.string().required(),
        itemType: Joi.string().required(),
        quantity: Joi.string().required(),
      })
    )
    .min(1)
    .optional(),
  deliveryRequested: Joi.boolean().optional(),
  deliveryDetails: Joi.when("deliveryRequested", {
    is: true,
    then: Joi.object({
      deliveryDate: Joi.date().required(),
      deliveryPrice: Joi.number().optional(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
    }).required(),

    otherwise: Joi.object({
      deliveryDate: Joi.date(),
      deliveryPrice: Joi.number(),
      address: Joi.string(),
      city: Joi.string(),
      country: Joi.string(),
    }).optional(),
  }),
  paymentDetails: Joi.object({
    method: Joi.string().valid("cash", "credit_card", "tmoney", "flooz"),
    status: Joi.string().valid("paid", "not_paid"),
    currency: Joi.string().valid("FCFA", "XOF"),
    totalAmountPaid: Joi.number(),
    paymentDate: Joi.date(),
  }).optional(),
});

const validateOrderData = function (data) {
  const value = orderScheme.validate(data);
  return value;
};

const validateOrderUpdateData = function (data) {
  const value = orderUpdateScheme.validate(data);
  return value;
};

module.exports = { validateOrderData, validateOrderUpdateData };
