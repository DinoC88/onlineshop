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
  deliveryInfo: { type: Object },
  date: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    default: "Awaiting Shipment"
  }
});

module.exports = mongoose.model("Order", orderSchema);
