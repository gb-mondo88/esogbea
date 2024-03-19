const { format } = require("date-fns");

module.exports = function () {
	return format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss.SSSX");
};
