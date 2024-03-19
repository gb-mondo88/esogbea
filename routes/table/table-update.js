const admin = require("../../firebase-admin-init");
const express = require("express");
const { validateTableUpdateData } = require("../../models/table");
const { TABLE_UPDATE } = require("../../constants/routes-paths");
const validateData = require("../../middlewares/common/validate-data");

const tableUpdateRouter = express.Router();

tableUpdateRouter.put(
  TABLE_UPDATE,
  validateData(validateTableUpdateData),
  async (req, res) => {
    try {
      const tableData = req.body;
      const id = req.params.id;
      if (Object.keys(tableData).length === 0)
        return res
          .status(400)
          .json({ code: "400", error: "No field found for update" });

      const tableRef = admin.firestore().collection("table").doc(id);
      await tableRef.update(tableData);
      return res
        .status(200)
        .json({ code: "200", message: "Table updated with Success" });
    } catch (e) {
      return res
        .status(500)
        .json({ code: "500", error: "Internal Server Error" });
    }
  }
);

module.exports = tableUpdateRouter;
