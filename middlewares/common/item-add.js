const admin = require("../../firebase-admin-init");
const Recursion = require("../../utils/func/recursion");

const itemAdd = async function (req, res, next) {
  //we get the request data
  const itemData = req.body;
  const collectionName = itemData.productType;

  try {
    const itemRef = admin.firestore().collection(collectionName).doc();
    itemData.id = itemRef.id;
    await itemRef.set(itemData);
    next();
  } catch (e) {
    if (req.fileRefInStorage) {
      await Recursion.recursiveAsync(() => req.fileRefInStorage.delete(), {
        retries: 3,
        catchError: false,
      });
    }
    next(e);
  }
};
module.exports = itemAdd;
