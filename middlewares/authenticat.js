const { getUserByToken } = require("../services/service.js");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];

    if (!token) {
      return next();
    }

    try {
      const user = getUserByToken(token);
      req.user = user;
    } catch (err) { }
    
    return next();
  };
}

module.exports = { checkForAuthenticationCookie };
