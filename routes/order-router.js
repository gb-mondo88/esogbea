const express = require("express");

const orderCreateRouter = require("./order/order-create");
const orderUpdateRouter = require("./order/order-update");
const getUserOrdersRouter = require("./order/get-user-orders");
const orderGetAllRouter = require("./order/order-get-all");
const orderDeleteRouter = require("./order/order-delete");
const orderGetbyIdRouter = require("./order/order-getby-id");
const orderGetAllLimitRouter = require("./order/order-get-all-limit");
const getUserOrdersLimitRouter = require("./order/get-user-orders-limit");

const orderRouter = express.Router();

orderRouter.use(orderCreateRouter);
orderRouter.use(orderUpdateRouter);
orderRouter.use(getUserOrdersRouter);
orderRouter.use(orderGetAllRouter);
orderRouter.use(orderDeleteRouter);
orderRouter.use(orderGetbyIdRouter);
orderRouter.use(orderGetAllLimitRouter);
orderRouter.use(getUserOrdersLimitRouter);

module.exports = orderRouter;
