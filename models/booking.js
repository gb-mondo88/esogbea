const Joi = require("joi");

const booking = Joi.object({
  id: Joi.string(),
  uid: Joi.string().required(),
  tableID: Joi.string().required(),
  status: Joi.string()
    .valid("pending", "confirmed", "cancelled")
    .default("pending"),
  bookingDate: Joi.date().required(),
  numberOfPeople: Joi.number().integer().min(1).required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

const validateBooking = function (data) {
  const value = booking.validate(data);
  return value;
};

module.exports = { validateBooking };
