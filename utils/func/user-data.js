const getAllowedFields = function (data) {
  const {
    uid,
    firstName,
    lastName,
    email,
    roles,
    phoneNumber,
    imageUrl,
    emailVerified,
    phoneVerified,
  } = { ...data };

  return {
    uid,
    firstName,
    lastName,
    email,
    roles,
    phoneNumber,
    imageUrl,
    emailVerified,
    phoneVerified,
  };
};

module.exports = { getAllowedFields };
