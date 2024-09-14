

// By this middleware we set  user id , email in req.user

const { get } = require("../services/auth");

async function checkAuth(req, res, next) {

  const token = req.headers['autorization'].split("Bearer ")[1];
  const sessionToken = req.headers['sessionToken'];

  const id = get(sessionToken);

  const user = get(token);
  
  req.sessionId = id.sessionId;
  req.user = user;
  next();
}

module.exports = {
  checkAuth,
};




