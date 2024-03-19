//Replaces (r) Spaces(s) by _ And then Capitalize all word after _ and first word
module.exports = function rsCapitalize(str) {
	// Replace spaces with underscores
	let newStr = str.replace(/\s+/g, "_");

	// Capitalize the first letter after each underscore
	newStr = newStr.replace(/_./g, (match) => match.toUpperCase());

	// Capitalize the first letter if it's the first character of the string
	newStr = str.replace(/^./, (match) => match.toUpperCase());

	return newStr;
};
