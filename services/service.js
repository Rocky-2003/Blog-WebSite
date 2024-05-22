const JWT = require("jsonwebtoken");
const secret = "rockyMor@123";

function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function getUserByToken(token) {
  const payLoas = JWT.verify(token, secret);
  return payLoas;
}

module.exports = {
  createToken,
  getUserByToken,
};
