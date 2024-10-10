// models/Card.js
const mongoose = require('mongoose');
const config = require("../config/config")

const CardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String, // Format: MM/YY
    required: true,
  },
  nameOnCard: {
    type: String,
    required: true,
  },
  cvv: {
    type: Number,
    required: true, // Start with no outstanding balance
  },
  outstandingAmount: {
    type: Number,
    default: config.default_credit_money, // Start with no outstanding balance
  },
});

module.exports = mongoose.model('Card', CardSchema);
