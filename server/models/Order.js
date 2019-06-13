const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderId: {
    type: String
  },
  userId: {
    type: String
  },
  transactionId: {
    type: String
  },
  products: [],
  deliveryInfo: [],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Order", orderSchema);
