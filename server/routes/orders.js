const express = require("express");
const User = require("../models/User");
const passport = require("passport");
const router = express.Router();

//@route POST /orders
//@desc  POST return user orders
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user).then(foundUser => {
      foundUser.orders = foundUser.orders.concat(req.body.order);
      foundUser.save(() => res.end());
    });
  }
);

module.exports = router;