const express = require("express");
const admin = require("../../firebase-admin-init");
const authenticate = require("../../middlewares/auth/authenticate");
const authorize = require("../../middlewares/auth/authorize");
const firestore = require("../../utils/func/firestore");
const { validateAddressUpdate } = require("../../models/address");
const validate = require("../../middlewares/common/validate-data");
const { ADDRESS_UPDATE } = require("../../constants/routes-paths");

const addressUpdateRouter = express.Router();

addressUpdateRouter.put(
  ADDRESS_UPDATE,
  authenticate,
  authorize(["client"], true),
  validate(validateAddressUpdate),
  async (req, res) => {
    try {
      const addressUpdate = req.body;
      const { id } = req.params;

      if (Object.keys(addressUpdate).length === 0)
        return res
          .status(400)
          .json({ code: "400", error: "No field provided for update" });

      if (!(await firestore.docExists(id, "address")))
        return res
          .status(404)
          .json({ code: "404", error: "No address found for update" });

      const flattenedAddress = firestore.flattenedObjectFrom(addressUpdate);

      console.log(flattenedAddress);

      const addressRef = admin.firestore().collection("address").doc(id);
      await addressRef.update(flattenedAddress);

      return res
        .status(200)
        .json({ code: "200", message: "Address updated with success" });
    } catch (e) {
      console.log(e)
      res.status(500).json({ code: "500", error: "Internal Server Error" });
    }
  }
);

module.exports = addressUpdateRouter;
