const validateData = function (validationLogic) {
  return function (req, res, next) {
    //we get the request data
    const itemData = req.body;
    const validation = validationLogic(itemData);
    if (validation.error) {
      return res.status(400).json({
        code: "400",
        error: "Bad request",
        message: validation.error.details[0].message,
      });
    }

    req.body = validation.value;

    next();
  };
};

module.exports = validateData;
