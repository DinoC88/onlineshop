const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const Cart = require("../models/Cart");
const jsonParser = bodyParser.json();
const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  jsonParser,
  (req, res) => {
    const user = req.body.userid;
    const item = {
      product: req.body.productid,
      quantity: req.body.quantity
    };
    Cart.findOne({ user: user })
      .then(foundCart => {
        if (foundCart) {
          let products = foundCart.items.map(item => item.product + "");
          if (products.includes(item.product)) {
            Cart.findOneAndUpdate(
              {
                user: user,
                items: {
                  $elemMatch: { product: item.product }
                }
              },
              {
                $inc: { "items.$.quantity": item.quantity }
              },
              { useFindAndModify: false }
            )
              .exec()
              .then(() => res.end());
          } else {
            foundCart.items.push(item);
            foundCart.save().then(() => res.end());
          }
        } else {
          Cart.create({
            user: user,
            items: [item]
          }).then(() => res.end());
        }
      })
      .catch(err => res.send(err));
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Cart.findOne({ user: req.user.id })
      .populate("items.product")
      .exec((err, cart) => {
        if (!cart) {
          return res.send(null);
        }
        res.send(cart);
      });
  }
);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  jsonParser,
  (req, res) => {
    Cart.findById(req.body.cartId).then(foundCart => {
      foundCart.items = foundCart.items.filter(
        item => item._id != req.body.itemId
      );
      foundCart.save(() => res.end());
    });
  }
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Cart.findByIdAndRemove(req.query.id)
      .then(() => res.end())
      .catch(err => res.send(err));
  }
);

module.exports = router;
