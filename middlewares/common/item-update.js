const admin = require("../../firebase-admin-init");
const Recursion = require("../../utils/func/recursion");

const itemUpdate = (collection) =>
  async function (req, res, next) {
    const docId = req.params.id;
    const fieldsToUpdate = req.body;
    try {
      await admin
        .firestore()
        .collection(collection)
        .doc(docId)
        .update(fieldsToUpdate);
      //Now url saved, we can delete the old file
      if (req.fileToDeleteRef) await req.fileToDeleteRef.delete();
      next();
    } catch (e) {
      if (req.newFileRefInStorage) {
        await Recursion.recursiveAsync(() => req.newFileRefInStorage.delete(), {
          retries: 3,
          catchError: false,
        });
      }
      next(e);
    }
  };

module.exports = itemUpdate;
