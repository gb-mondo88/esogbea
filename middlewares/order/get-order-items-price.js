const admin = require("../../firebase-admin-init");

const getOrderItemsPrice = async function (req, res, next) {
  if (!req.body.totalItemsPrice)
    try {
      const items = req.body.items;
      let totalItemsPrice = 0;
      let error;

      const totalItemsPricePromises = items.map(async (item) => {
        try {
          const itemID = item.itemID;
          const itemPriceSnapshot = await admin
            .firestore()
            .collection(item.itemType === "food" ? "food" : "drink")
            .where("id", "==", itemID)
            .select("price")
            .get();
          const itemPrice = itemPriceSnapshot.docs[0].get("price");
          totalItemsPrice += itemPrice * item.quantity;
        } catch (e) {
          console.log(e);
          error = true;
          return;
        }
      });
      await Promise.all(totalItemsPricePromises);

      if (error)
        return res
          .status(500)
          .json({ code: "500", error: "Internal Server Error" });
      req.body.totalItemsPrice = totalItemsPrice;

      next();
    } catch (error) {
      return res
        .status(500)
        .json({ code: "500", error: "Internal Server Error" });
    }
  else next();
};

module.exports = getOrderItemsPrice;
