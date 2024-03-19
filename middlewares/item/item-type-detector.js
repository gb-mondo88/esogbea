const itemTypeDetector = function (req, res, next) {
  const body = req.body;
  if (!body.productType)
    return res
      .status(400)
      .json({ code: "400", error: "Product type not provided" });

  const productType = body.productType.toLowerCase();

  if (!["food", "drink"].includes(productType))
    return res
      .status(400)
      .json({ code: "400", error: "Product type must be 'food' or 'drink' " });
  req.body.productType = productType;
  next();
};

module.exports = itemTypeDetector;
