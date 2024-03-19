const express = require("express");
const {
  AUTH_GET_NEW_VERIFY_LINK_PAGE,
  AUTH_SEND_VERIFY_LINK,
} = require("../../../constants/routes-paths");

// route assignment
const getVerificationLinkPageRouter = express.Router();

getVerificationLinkPageRouter.get(AUTH_GET_NEW_VERIFY_LINK_PAGE, (req, res) => {
  return res.render("request-new-verification-link-page", {
    sendVerificationLinkRoute: `${AUTH_SEND_VERIFY_LINK}`,
  });
});

module.exports = getVerificationLinkPageRouter;
