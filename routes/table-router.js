const express = require("express");

const tableCreateRoute = require("./table/table-create");
const tableUpdateRouter = require("./table/table-update");
const tableDeleteRouter = require("./table/table-delete");
const tableGetAllRouter = require("./table/table-get-all");
const tableGetAvailableRouter = require("./table/table-get-available");
const tableGetwithCapacityRouter = require("./table/table-getwith-capacity");
const tableGetbyIdRouter = require("./table/table-getby-id");

const tableRouter = express.Router();

tableRouter.use(tableCreateRoute);
tableRouter.use(tableUpdateRouter);
tableRouter.use(tableDeleteRouter);
tableRouter.use(tableGetAllRouter);
tableRouter.use(tableGetAvailableRouter);
tableRouter.use(tableGetwithCapacityRouter);
tableRouter.use(tableGetbyIdRouter);

module.exports = tableRouter;
