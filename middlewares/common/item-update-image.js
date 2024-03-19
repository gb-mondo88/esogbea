const admin = require("../../firebase-admin-init");
const { getDownloadURL } = require("firebase-admin/storage");
const currentDate = require("../../utils/func/current-date");
const Recursion = require("../../utils/func/recursion");
const gcsFile = require("../../utils/func/gcs-file");
const {
  FOOD_UPDATE_IMAGE,
  FOOD_UPDATE,
  DRINK_UPDATE_IMAGE,
  DRINK_UPDATE,
} = require("../../constants/routes-paths");

const itemUpdateImage = (collection) =>
  async function (req, res, next) {
    if (
      !req.file &&
      (req.path === FOOD_UPDATE_IMAGE.split(":").slice(0, -1) + req.params.id ||
        req.path === DRINK_UPDATE_IMAGE.split(":").slice(0, -1) + req.params.id)
    )
      return res.status(400).json({
        code: 400,
        error: "Bad request",
        message: "No file provided",
      });

    if (
      !req.file &&
      (req.path === FOOD_UPDATE.split(":").slice(0, -1) + req.params.id ||
        req.path === DRINK_UPDATE.split(":").slice(0, -1) + req.params.id)
    )
      return next();

    try {
      //In case there exists a file: req.file == true
      const doc = await admin
        .firestore()
        .collection(collection)
        .doc(req.params.id)
        .get();
      const imageToDeleteUrl = doc.data().imageUrl;
      const { fileRef: fileToDeleteRef, folderPath } =
        gcsFile.refFromURL(imageToDeleteUrl);

      const newFileName = currentDate() + "__" + req.file.originalname;
      const newFile = admin
        .storage()
        .bucket()
        .file(`${folderPath}/${newFileName}`);
      const newFileStream = newFile.createWriteStream({
        contentType: req.file.mimetype,
        resumable: false,
        public: true,
      });
      newFileStream.on("error", (e) => {
        next(e);
      });
      newFileStream.on("finish", async () => {
        try {
          req.body.imageUrl = await getDownloadURL(newFile);
          //Save the old file ref to delete once new url is updated
          req.fileToDeleteRef = fileToDeleteRef;
          req.newFileRefInStorage = newFile;
          next();
        } catch (e) {
          await Recursion.recursiveAsync(() => newFile.delete(), {
            retries: 3,
            catchError: false,
          });

          next(e);
        }
      });
      newFileStream.end(req.file.buffer);
    } catch (e) {
      next(e);
    }
  };

module.exports = itemUpdateImage;
