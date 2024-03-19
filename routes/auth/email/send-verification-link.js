const express = require("express");
const { emailExists } = require("../../../utils/func/firestore");
const sendLink = require("../../../utils/func/send-link");
const { AUTH_SEND_VERIFY_LINK } = require("../../../constants/routes-paths");

// route assignment
const sendVerificationLinkRouter = express.Router();

// Post request
sendVerificationLinkRouter.post(AUTH_SEND_VERIFY_LINK, async (req, res) => {
  try {
    const email = req.body.email;
    const emailRegistered = await emailExists(email);

    if (!emailRegistered)
      return res.status(400).json({
        code: "400",
        error: "Email not found. Create account first.",
      });

    //Send link to user
    sendLink(email);

    return res
      .status(200)
      .json({ code: "200", message: "link sent successfully" });
  } catch (e) {
    return res
      .status(500)
      .json({ code: "500", error: "Internal Server Error" });
  }
});

module.exports = sendVerificationLinkRouter;
