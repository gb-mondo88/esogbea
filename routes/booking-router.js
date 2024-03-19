const express = require("express");
const bookingCreateRouter = require("./booking/booking-create");
const bookingGetAllRouter = require("./booking/booking-get-all");

const bookingRouter = express.Router();

bookingRouter.use(bookingCreateRouter);
bookingRouter.use(bookingGetAllRouter);

module.exports = bookingRouter;
