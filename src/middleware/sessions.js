const getSession = require("../model/session");
const removeSession = require("../model/session");

const sessions = (req, res, next) => {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);
  console.log(session);
  if (session) {
    const expiry = new Date(session.expires_at);
    const today = new Date();
    if (expiry < today) {
      removeSession(sid);
      res.clearCookie("sid");
    } else {
      req.session = session;
    }
  }
  next();
};

module.exports = sessions;
