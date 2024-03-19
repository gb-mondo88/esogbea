const admin = require("../../firebase-admin-init");
const gcsFile = require("../../utils/func/gcs-file");

const itemDelete = (collection) => async (req, res, next) => {
  const docId = req.params.id;

  try {
    const docRef = admin.firestore().collection(collection).doc(docId);
    const doc = await docRef.get();
    if (doc.exists) {
      const imageUrl = doc.get("imageUrl");
      const imageRef = gcsFile.refFromURL(imageUrl).fileRef;
      try {
        await docRef.delete();
      } catch (error) {
        return res.status(500).json({
          code: "500",
          error: "Error while deleting product",
        });
      }
      try {
        await imageRef.delete();
      } catch (e) {
        await docRef.set(doc.data());
        return res.status(500).json({
          code: "500",
          error: "Error while deleting product",
        });
      }
      return next();
    } else
      return res
        .status(404)
        .json({ code: "404", error: "Product Not Found For Deletion" });
  } catch (error) {
    return res
      .status(500)
      .json({ code: "500", error: "Internal Server Error" });
  }
};

module.exports = itemDelete;
