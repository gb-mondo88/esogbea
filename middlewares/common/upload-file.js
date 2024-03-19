const multer = require("multer");

const uploadFile = (fieldName) =>
  function (req, res, next) {
    const multerInit = multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 15 * 1024 * 1024 },
    });

    const upload = multerInit.array(fieldName, 10);
    upload(req, res, function (error) {
      if (error) next(error);
      else next();
    });
  };

module.exports = uploadFile;
