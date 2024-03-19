const itemModel = require("../../models/item");

const validate = {
  createData: function (req, res, next) {
    // Select the validation function based on the product type
    const validationLogic =
      req.body.productType.toLowerCase() === "food"
        ? itemModel.validateFood
        : itemModel.validateDrink;
    const item = req.body;

    const validation = validationLogic(item);

    if (validation.error) {
      return res.status(400).json({
        code: "400",
        error: validation.error.details[0].message,
      });
    }
    req.body = validation.value;

    next();
  },

  updateData: function (req, res, next) {
    const type = req.params.type;
    if (type.toLowerCase() === "drink" && req.body.hasOwnProperty("isCooked"))
      return res
        .status(400)
        .json({ code: 400, error: "Property 'isCooked' is not allowed" });
    if (type.toLowerCase() === "food" && req.body.hasOwnProperty("abv"))
      return res
        .status(400)
        .json({ code: 400, error: "Property 'abv' is not allowed" });
    const item = req.body;

    const validation = itemModel.validateItemUpdate(item);

    if (validation.error) {
      return res.status(400).json({
        code: "400",
        error: validation.error.details[0].message,
      });
    }
    req.body = validation.value;

    next();
  },
};

module.exports = validate;
