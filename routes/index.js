const express = require("express");
const router = express.Router();
const mongodb = require("../data/database");
const passport = require("passport");

//swagger documentation route
router.use("/", require("./swagger"));

//Initial message at the root route
//router.get("/", (req, res) => {
//#Swagger.tags = ['Hello World']
// res.send("Hello, welcome to the API");
//});

//get all animals
router.use("/animals", require("./animals"));

//get all ice cream flavors
router.use("/icecream", require("./icecream"));

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
