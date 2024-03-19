const nodemailer = require("nodemailer");

const sendEmail = async function (userEmail, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });
  const mailOptions = {
    from: `"Esogbea" <${process.env.EMAIL}>`,
    to: userEmail,
    subject: "Confirmer votre adresse Mail",
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (e) {
    throw e;
  }
};

module.exports = sendEmail;
