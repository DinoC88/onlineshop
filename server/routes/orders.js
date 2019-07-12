const braintree = require("braintree");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { merchantId, publicKey, privateKey } = require("../config/keys");
const Payment = require("../models/Payment");
const User = require("../models/User");
const Order = require("../models/Order");
var ObjectID = require("mongodb").ObjectID;

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId,
  publicKey,
  privateKey
});
//admin orders list
router.post("/orders", (req, res) => {
  Order.find().exec((err, orders) => {
    res.json({ orders });
  });
});
//user orders list
router.post("/userorders", (req, res) => {
  Order.find({ userId: req.body.userId }).exec((err, orders) => {
    res.json({ orders });
  });
});
//admin transaction list
router.post("/transactionlist", (req, res) => {
  Payment.find().exec((err, transaction) => {
    res.json({ transaction });
  });
});
// admin get order by id
router.post("/orderid", (req, res) => {
  Order.findById(req.body.orderid).then(order => {
    res.json(order);
  });
});
// admin get transaction by id
router.post("/transaction", (req, res) => {
  Payment.find({ transactionId: req.body.transactionId }).then(transaction => {
    res.json(transaction);
  });
});
// admin change order status
router.post("/test", (req, res) => {
  Order.update(
    { _id: req.body.id },
    { $set: { status: req.body.status } }
  ).exec();
});

//paypal-braintree
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
                paymentMethod:
                  transaction.paymentInstrumentType === "credit_card"
                    ? "Credit card"
                    : "Paypal",
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
              res.send({ orderId: newOrder._id });
              newPayment.save(() => res.end);
            });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
);

router.post(
  "/delivery",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var transactionId = new ObjectID();
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
      transactionId: transactionId,
      dateBuyed: Date.now()
    });
    User.update(
      { _id: req.user._id },
      { $push: { orderHistory: productList } }
    ).exec();
    newOrder.save(() => {
      const newPayment = new Payment({
        transactionId: transactionId,
        orderId: newOrder._id,
        amount: req.body.total,
        paymentMethod: "Pay on delivery",
        currency: null,
        status: "Pay on delivery",
        paymentDetails: null,
        date: Date.now()
      });
      res.send({ orderId: newOrder._id });
      newPayment.save(() => res.end());
    });
  }
);

module.exports = router;
