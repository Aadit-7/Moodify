const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      msg: "Token is not provided",
    });
  }

   const isTokenBlacklisted = await redis.get(token)

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JET_SECREAT);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid Token",
    });
  }
}

module.exports = { authUser };
