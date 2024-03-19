const express = require("express");

const cartAddItemRouter = require("./cart/cart-add-item");
const getUserCartRouter = require("./cart/get-user-cart");
const cartUpdateItemRouter = require("./cart/cart-update-item");
const cartDeleteItemRouter = require("./cart/cart-delete-item");
const cartEmptyRouter = require("./cart/cart-empty");

const cartRouter = express.Router();

cartRouter.use(cartAddItemRouter);
cartRouter.use(getUserCartRouter);
cartRouter.use(cartUpdateItemRouter);
cartRouter.use(cartDeleteItemRouter);
cartRouter.use(cartEmptyRouter);

module.exports = cartRouter;
