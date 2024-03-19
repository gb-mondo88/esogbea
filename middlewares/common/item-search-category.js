//This middleware searches items based on the category provided
//Sub-Categories are considered to be categories also
//The "Category" is taken within the request url as a parameter

const admin = require("../../firebase-admin-init");

const itemSearchCategory = (collection) =>
	function (req, res, next) {
		const dbCollection = admin.firestore().collection(dbCollection);
		const query = req.params.category;

		const data = dbCollection.where("").get();
	};
