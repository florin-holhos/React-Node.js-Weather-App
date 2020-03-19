const router = require("express").Router();

router.get("/", function(req, res, next) {
  console.log(req.headers);
  res.send({ message: "Welcome to weather API!" });
});

module.exports = router;
