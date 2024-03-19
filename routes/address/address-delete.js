const express = require("express");
const admin = require("../../firebase-admin-init");
const authenticate = require("../../middlewares/auth/authenticate");
const authorize = require("../../middlewares/auth/authorize");
const firestore = require("../../utils/func/firestore");
const { ADDRESS_DELETE } = require("../../constants/routes-paths");

const addressDeleteRouter = express.Router();

addressDeleteRouter.delete(
  ADDRESS_DELETE,
  authenticate,
  authorize(["client"], true),
  async (req, res) => {
    try {
      const { id } = req.params;

      if (Object.keys(req.body).length !== 0)
        return res
          .status(400)
          .json({ code: "400", error: "The body is not allowed" });

      if (!(await firestore.docExists(id, "address")))
        return res
          .status(404)
          .json({ code: "404", error: "No address found for deletion" });

      await admin.firestore().collection("address").doc(id).delete();

      return res
        .status(200)
        .json({ code: "200", message: "Address deleted with success" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ code: "500", error: "Internal Server Error" });
    }
  }
);

module.exports = addressDeleteRouter;
