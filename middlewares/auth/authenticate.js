const jwt = require("jsonwebtoken");

const authenticate = function (req, res, next) {
  try {
    const token = req.header("token");
    if (!token)
      return res
        .status(401)
        .json({ code: "401", error: "User not authenticated" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ code: "401", error: "User not authenticated" });
    req.decoded = decoded;
    req.token = token;
    next();
  } catch (e) {
    return res
      .status(401)
      .json({ code: "401", error: "User not authenticated" });
  }
};

module.exports = authenticate;
