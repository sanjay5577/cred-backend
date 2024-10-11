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
    required: true, 
  },
  creditLimit: {
    type: Number,
    default: config.default_credit_money, // Set default credit limit (₹1,00,000 or any desired amount)
  },
  outstandingAmount: {
    type: Number,
    default: 0, // Start with no outstanding balance (no spending initially)
  },
});

module.exports = mongoose.model('Card', CardSchema);
