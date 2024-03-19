//This file initialize the firebase admin instance
const admin = require("firebase-admin");
const serviceAccount = require("./packages/esogbea/v/latest/1/esogbeaServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

module.exports = admin;
