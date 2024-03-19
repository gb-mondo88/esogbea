const admin = require("../../firebase-admin-init");
const express = require("express");
const { TABLE_DELETE } = require("../../constants/routes-paths");

const tableDeleteRouter = express.Router();

tableDeleteRouter.delete(TABLE_DELETE, async (req, res) => {
  try {
    const id = req.params.id;
    if (Object.keys(req.body).length !== 0)
      return res
        .status(400)
        .json({ code: "400", error: "The req's body is not allowed" });

    const tableRef = admin.firestore().collection("table").doc(id);
    const table = await tableRef.get();
    if (!table.exists)
      return res
        .status(404)
        .json({ code: "404", error: "No Table Found for Deletion" });
    await tableRef.delete();
    return res
      .status(200)
      .json({ code: "200", message: "Table deleted with Success" });
  } catch (e) {
    return res
      .status(500)
      .json({ code: "500", error: "Internal Server Error" });
  }
});

module.exports = tableDeleteRouter;
