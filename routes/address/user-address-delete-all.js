const express = require("express");
const admin = require("../../firebase-admin-init");
const authenticate = require("../../middlewares/auth/authenticate");
const authorize = require("../../middlewares/auth/authorize");
const { USER_ADDRESS_DELETE_ALL } = require("../../constants/routes-paths");

const userAddressDeleteAllRouter = express.Router();

userAddressDeleteAllRouter.delete(
  USER_ADDRESS_DELETE_ALL,
  authenticate,
  authorize(["client", true]),
  async (req, res) => {
    try {
      const { uid } = req.params;

      if (Object.keys(req.body).length !== 0)
        return res
          .status(400)
          .json({ code: "400", error: "The body is not allowed" });

      const snapshot = await admin
        .firestore()
        .collection("address")
        .where("uid", "==", uid)
        .get();

      if (snapshot.empty)
        return res
          .status(404)
          .json({ code: "404", error: "No address found for deletion" });

      const batch = admin.firestore().batch();
      snapshot.forEach((doc) => batch.delete(doc.ref));

      await batch.commit();

      return res
        .status(200)
        .json({ code: "200", error: "All addresses deleted for user" });
    } catch (e) {
      return res
        .status(500)
        .json({ code: "500", error: "Internal Server Error" });
    }
  }
);

module.exports = userAddressDeleteAllRouter;
