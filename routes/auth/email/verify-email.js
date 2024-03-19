//This file has the purpose to sign up a user and handle all related errors

const express = require("express");
const admin = require("../../../firebase-admin-init");
const jwt = require("jsonwebtoken");
const {
  AUTH_VERIFY_EMAIL,
  AUTH_GET_NEW_VERIFY_LINK_PAGE,
} = require("../../../constants/routes-paths");

// route assignment
const verifyEmailRouter = express.Router();

// Post request
verifyEmailRouter.get(AUTH_VERIFY_EMAIL, async (req, res) => {
  //Get the token
  const token = req.query.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    const userSnapshot = await admin
      .firestore()
      .collection("user")
      .where("email", "==", email)
      .get();

    if (userSnapshot.empty)
      return res
        .status(401)
        .send(
          "Vous n'avez aucun compte avec cette adresse. veuillez en créer un"
        );
    const user = userSnapshot.docs[0];
    const emailAlreadyVerified = user.get("emailVerified");

    if (emailAlreadyVerified) return res.render("email-already-verified-page");

    //Update the account
    const id = user.id;
    await admin.firestore().collection("user").doc(id).update({
      emailVerified: true,
      emailVerifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.render("email-success-page");
  } catch (e) {
    if (e.name === "TokenExpiredError")
      return res.render("token-expired-page", {
        anotherLink: `${AUTH_GET_NEW_VERIFY_LINK_PAGE}`,
      });
    const retryLink = req.path + `?token=${token}`;
    return res.render("email-verify-error-page", { retryLink });
  }
});

module.exports = verifyEmailRouter;
