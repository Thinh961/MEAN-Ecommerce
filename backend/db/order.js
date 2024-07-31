const mongoose = require("mongoose");
const oderSchema = new mongoose.Schema({
    date: Date,
    items: Array(any),
    status: Number
});
const Order = mongoose.model("orders", oderSchema);
module.exports = Order;