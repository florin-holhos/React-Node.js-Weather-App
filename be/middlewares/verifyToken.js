const jwt = require("jsonwebtoken");

module.exports = verify = (req, res, next) => {
  const token = req.header("weather_app_token");
  if (!token) return res.status(401).send("Access Denied!");
  try {
    jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (err) {
    res.status(400).send("Invalid Token!");
  }
};
