const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  paymentMethod: {
    type: String
  },
  orderId: {
    type: String
  },
  transactionId: {
    type: String
  },
  currency: {
    type: String
  },
  status: {
    type: String
  },
  paymentDetails: { type: Object },
  amount: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Payment", paymentSchema);
