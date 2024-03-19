const express = require("express");
const addressAddRouter = require("./address/address-add");
const addressUpdateRouter = require("./address/address-update");
const addressDeleteRouter = require("./address/address-delete");
const addressGetByIdRouter = require("./address/address-get-by-id");
const userGetAddressRouter = require("./address/user-address-get");
const userAddressDeleteAllRouter = require("./address/user-address-delete-all");

const addressRouter = express.Router();

addressRouter.use(addressAddRouter);
addressRouter.use(addressUpdateRouter);
addressRouter.use(addressDeleteRouter);
addressRouter.use(addressGetByIdRouter);
addressRouter.use(userGetAddressRouter);
addressRouter.use(userAddressDeleteAllRouter);

module.exports = addressRouter;
