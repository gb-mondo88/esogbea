const admin = require("../../firebase-admin-init");
//This middleware search a product based on its id;

const itemSearchId = (collection) =>
	async function (req, res, next) {
		const docId = req.params.id;
		try {
			const doc = await admin
				.firestore()
				.collection(collection)
				.doc(docId)
				.get();
			if (doc.exists) {
				return res.status(200).json({
					code: "200",
					message: "Succes",
					food: doc.data(),
				});
			} else
				return res
					.status(404)
					.json({ code: "404", error: "Product not found" });
		} catch (error) {
			return res
				.status(404)
				.json({ code: "404", error: "This product does not exist" });
		}
	};

module.exports = itemSearchId;
