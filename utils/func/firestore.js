const { object } = require("joi");
const admin = require("../../firebase-admin-init");

const firestore = {
  emailExists: async function (email) {
    try {
      const snapshot = await admin
        .firestore()
        .collection("user")
        .where("email", "==", email)
        .limit(1)
        .get();

      if (snapshot.empty) return false;
      else return true;
    } catch (e) {
      throw e;
    }
  },

  fieldExists: async function (field, value, collection) {
    try {
      const snapshot = await admin
        .firestore()
        .collection(collection)
        .where(field, "==", value)
        .get();
      return !snapshot.empty;
    } catch (e) {
      throw e;
    }
  },

  docExists: async (docID, collection) => {
    try {
      const result = await admin
        .firestore()
        .collection(collection)
        .doc(docID)
        .get();
      return result.exists;
    } catch (e) {
      throw e;
    }
  },

  flattenedObjectFrom: function (obj) {
    const flattenedObj = {};
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object") {
        Object.keys(obj[key]).forEach((nestedKey) => {
          flattenedObj[`${key}.${nestedKey}`] = obj[key][nestedKey];
        });
      } else flattenedObj[key] = obj[key];
    });

    return flattenedObj;
  },
};

module.exports = firestore;
