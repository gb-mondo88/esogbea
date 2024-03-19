const sendEmail = require("../../utils/func/send-email");
const generateToken = require("../../utils/func/generate-token");
const generateEmailTemplate = require("../../utils/func/generate-email-template");
const { AUTH_VERIFY_EMAIL } = require("../../constants/routes-paths");

const sendLink = async function (email) {
  //Generate the token to be sent to user
  const token = generateToken({ email: email });

  // Constructs email's verification link
  const env = process.env;
  const emailVerificationLink = `${env.PROTOCOL}://${env.HOST}:${
    env.PORT || 6061
  }${AUTH_VERIFY_EMAIL}?token=${encodeURIComponent(token)}`;
  try {
    // Send email to user for email verification
    await sendEmail(email, generateEmailTemplate(emailVerificationLink));
  } catch (e) {
    throw e;
  }
};

module.exports = sendLink;
