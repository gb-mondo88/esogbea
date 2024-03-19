const admin = require("../../firebase-admin-init");
const express = require("express");
const { validateTableData } = require("../../models/table");
const { TABLE_CREATE } = require("../../constants/routes-paths");
const validateData = require("../../middlewares/common/validate-data");

const tableCreateRouter = express.Router();

tableCreateRouter.post(
  TABLE_CREATE,
  validateData(validateTableData),
  async (req, res) => {
    try {
      const tableData = req.body;
      const tableRef = admin.firestore().collection("table").doc();
      await tableRef.set({ id: tableRef.id, ...tableData });
      return res
        .status(200)
        .json({ code: "200", message: "Table created with Success" });
    } catch (e) {
      return res
        .status(500)
        .json({ code: "500", error: "Internal Server Error" });
    }
  }
);

module.exports = tableCreateRouter;
