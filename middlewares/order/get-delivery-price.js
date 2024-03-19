const getDeliveryPrice = function (req, res, next) {
  if (req.body.deliveryRequested && !req.body.deliveryDetails.deliveryPrice) {
    req.body.deliveryDetails.deliveryPrice = 1000;
  }
  next();
};
