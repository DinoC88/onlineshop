const braintree = require("braintree");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { merchantId, publicKey, privateKey } = require("../config/keys");
const Payment = require("../models/Payment");
const User = require("../models/User");
const Order = require("../models/Order");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId,
  publicKey,
  privateKey
});

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
router.post("/orders", (req, res) => {
  Order.find().exec((err, orders) => {
    res.json({ orders });
  });
});
router.get("/braintree", (req, res) => {
  res.send("Braintree works");
});

router.get("/getToken", async function(req, res) {
  try {
    gateway.clientToken.generate({}, function(err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post(
  "/online",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let productList = req.body.product.map(item => {
      let product = {
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        dateCreated: Date.now()
      };
      return product;
    });

    try {
      // Use the payment method nonce here
      var nonceFromTheClient = req.body.paymentMethodNonce;
      // Create a new transaction for amount
      var newTransaction = gateway.transaction.sale(
        {
          amount: req.body.total,
          paymentMethodNonce: nonceFromTheClient,
          options: {
            // This option requests the funds from the transaction once it has been
            // authorized successfully
            submitForSettlement: true
          }
        },
        function(error, result) {
          if (result) {
            res.send(result);
            const newOrder = new Order({
              deliveryInfo: {
                firstname: req.body.info.firstName,
                lastname: req.body.info.lastName,
                email: req.body.info.email,
                phone: req.body.info.phone,
                address: req.body.info.address,
                city: req.body.info.city,
                zipcode: req.body.info.zipcode
              },
              products: productList,
              amount: req.body.total,
              userId: req.user._id,
              transactionId: result.transaction.id,
              date: Date.now()
            });
            User.update(
              { _id: req.user._id },
              { $push: { orderHistory: productList } }
            ).exec();
            newOrder.save(() => {
              let transaction = result.transaction;
              let paypal = result.transaction.paypal;
              const newPayment = new Payment({
                transactionId: transaction.id,
                orderId: newOrder._id,
                amount: transaction.amount,
                paymentMethod: transaction.paymentInstrumentType,
                currency: transaction.currencyIsoCode,
                status: transaction.status,
                paymentDetails:
                  transaction.paymentInstrumentType === "paypal_account"
                    ? {
                        authorizationId: paypal.authorizationId,
                        payerEmail: paypal.payerEmail,
                        payerFirstName: paypal.payerFirstName,
                        payerLastName: paypal.payerLastName,
                        payerStatus: paypal.payerStatus,
                        payerId: paypal.payerId,
                        paymentId: paypal.paymentId,
                        transactionFee: paypal.transactionFeeAmount,
                        transactionFeeCurrency:
                          paypal.transactionFeeCurrencyIsoCode
                      }
                    : {
                        bin: transaction.creditCard.bin,
                        cardType: transaction.creditCard.cardType,
                        customerLocation:
                          transaction.creditCard.customerLocation,
                        expirationDate: transaction.creditCard.expirationDate,
                        last4: transaction.creditCard.last4,
                        maskedNumber: transaction.creditCard.maskedNumber
                      },
                date: Date.now()
              });
              newPayment.save(() => res.end);
            });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (err) {
      // Deal with an error
      console.log(err);
      res.send(err);
    }
  }
);

router.post(
  "/delivery",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let productList = req.body.product.map(item => {
      let product = {
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        dateCreated: Date.now()
      };
      return product;
    });
    const newOrder = new Order({
      deliveryInfo: {
        firstname: req.body.info.firstName,
        lastname: req.body.info.lastName,
        email: req.body.info.email,
        phone: req.body.info.phone,
        address: req.body.info.address,
        city: req.body.info.city,
        zipcode: req.body.info.zipcode
      },
      products: productList,
      amount: req.body.total,
      userId: req.user._id,
      transactionId: "Paying on delivery",
      dateBuyed: Date.now()
    });
    User.update(
      { _id: req.user._id },
      { $push: { orderHistory: productList } }
    ).exec();
    newOrder.save(() => {
      const newPayment = new Payment({
        transactionId: null,
        orderId: newOrder._id,
        amount: req.body.total,
        paymentMethod: "Pay on delivery",
        currency: null,
        status: "Pay on delivery",
        paymentDetails: {},
        date: Date.now()
      });
      newPayment.save(() => res.end());
    });
  }
);

module.exports = router;
