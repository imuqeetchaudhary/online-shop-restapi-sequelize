const config = require("config");
const jwt = require("jsonwebtoken");
const { promise } = require("./promise");

exports.authentication = promise((req, res, next) => {
  const token = req.headers["x-auth-token"] || req.headers["authorization"];

  if (!token)
    return res.status(401).json({ message: "Auth Failed! Invalid Token" });

  const user = jwt.verify(token, config.get("jwt.secret"));

  if (!user)
    return res.status(401).json({ message: "Auth Failed! Invalid Token" });

  req.user = user;
  next();
});
