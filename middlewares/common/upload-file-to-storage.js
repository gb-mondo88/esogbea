const admin = require("../../firebase-admin-init");
const { getDownloadURL } = require("firebase-admin/storage");
const currentDate = require("../../utils/func/current-date");
const rsCapitalize = require("../../utils/func/rsCapitalize");
const Recursion = require("../../utils/func/recursion");

//uploadFile: upload file to firebase storage
const uploadFileToStorage = function (req, res, next) {
  if (!req.file) {
    res.status(400).json({ code: "400", error: "No file provided" });
    return;
  }
  try {
    const [body, bucket, fileName] = [
      req.body,
      admin.storage().bucket(),
      currentDate() + "__" + req.file.originalname,
    ];
    const file = bucket.file(
      `${rsCapitalize(body.productType)}/${rsCapitalize(
        body.category
      )}/${rsCapitalize(body.subCategory)}/${fileName}`
    );
    const fileStream = file.createWriteStream({
      contentType: req.file.mimetype,
      resumable: false,
      public: true,
    });
    fileStream.on("error", (error) => {
      next(error);
    });
    fileStream.on("finish", async () => {
      try {
        req.body.imageUrl = await getDownloadURL(file);
        req.fileRefInStorage = file;
        next();
      } catch (e) {
        await Recursion.recursiveAsync(() => file.delete(), {
          retries: 3,
          catchError: false,
        });

        next(e);
      }
    });
    fileStream.end(req.file.buffer);
  } catch (e) {
    next(e);
  }
};

module.exports = uploadFileToStorage;
