const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const admin = require("../../../firebase-admin-init");
const { emailExists } = require("../../../utils/func/firestore");
const { AUTH_LOGIN } = require("../../../constants/routes-paths");

const loginRouter = express.Router();

loginRouter.post(AUTH_LOGIN, async (req, res) => {
  try {
    const { email, password } = req.body;

    const accountWithEmailExist = await emailExists(email);
    if (!accountWithEmailExist)
      return res
        .status(400)
        .json({ code: "400", error: "No user found with this email" });
    const userSnapshot = await admin
      .firestore()
      .collection("user")
      .where("email", "==", email)
      .limit(1)
      .select(
        "uid",
        "firstName",
        "lastName",
        "email",
        "roles",
        "phoneNumber",
        "imageUrl",
        "emailVerified",
        "phoneVerified",
        "password"
      )
      .get();

    const user = userSnapshot.docs[0].data();
    if (!user.emailVerified)
      return res
        .status(403)
        .json({ code: "403", error: "Account not verified" });

    //Verify wether the password is correct or not
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ code: "400", error: "Incorrect Password" });
    const token = jwt.sign(
      { uid: user.uid, email: user.email, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: 604800 }
    );
    await admin.firestore().collection("user").doc(user.uid).update({
      signedInAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    //Exclude the password
    delete user.password;

    return res.status(200).json({
      code: "200",
      message: "Logged In with Success",
      user: { ...user, token },
    });
  } catch (e) {
    return res
      .status(500)
      .json({ code: "500", error: "Internal Server Error" });
  }
});

module.exports = loginRouter;
