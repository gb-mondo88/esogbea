const admin = require("../../firebase-admin-init");

const getOrderItems = async function (req, res, next) {
  if (!req.body.items)
    try {
      const userID = req.body.userID;
      const cartItemsSnapshot = await admin
        .firestore()
        .collection("cart")
        .where("userID", "==", userID)
        .select("items")
        .get();
      const cartItems = cartItemsSnapshot.docs[0].get("items");
      req.body.items = cartItems;
      next();
    } catch (e) {
      return res
        .status(500)
        .json({ code: "500", error: "Internal Server Error" });
    }
  else next();
};

module.exports = getOrderItems;
