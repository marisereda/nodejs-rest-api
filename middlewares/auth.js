const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(new Unauthorized("Not authorized"));
    return;
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      next(new Unauthorized("Not authorized"));
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    if (["TokenExpiredError", "JsonWebTokenError"].includes(error.name)) {
      next(new Unauthorized("Not authorized"));
      return;
    }
    next(error);
  }
};

module.exports = auth;
