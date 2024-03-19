const express = require("express");
const itemAddRouter = require("./item/item-add");
const itemUpdateRouter = require("./item/item-update");
const itemFavoriteRouter = require("./item/item-favorite");
const itemUnFavoriteRouter = require("./item/item-unfavorite");
const itemGetByIdRouter = require("./item/item-get-by-id");
const itemGetDrinksRouter = require("./item/item-get-drink");
const itemGetFoodsRouter = require("./item/item-get-food");

const itemRouter = express.Router();

itemRouter.use(itemAddRouter);
itemRouter.use(itemUpdateRouter);
itemRouter.use(itemFavoriteRouter);
itemRouter.use(itemUnFavoriteRouter);
itemRouter.use(itemGetByIdRouter);
itemRouter.use(itemGetDrinksRouter);
itemRouter.use(itemGetFoodsRouter);

module.exports = itemRouter;
