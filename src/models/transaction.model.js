const mongoose = require('mongoose');
const moment = require('moment'); // Moment.js to handle date formatting

// Transaction schema
const TransactionSchema = new mongoose.Schema({
  amount: Number,
  vendor: String,
  type: { // Credit or Debit
    type: String,
    enum: ['Credit', 'Debit'],
  },
  category: String, // e.g., Medical, Groceries, etc.
  month: String, // MM/YYYY format
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

// Function to generate default transactions for the last three months
const generateDefaultTransactions = () => {
  const defaultTransactions = [];
  
  // Get current date and subtract months
  for (let i = 1; i <= 3; i++) {
    const month = moment().subtract(i, 'months').format('MM/YYYY');
    
    // Add two transactions for each month
    defaultTransactions.push({
      amount: Math.floor(Math.random() * 1000) + 1, // Random amount
      vendor: 'Vendor A',
      type: 'Debit',
      category: 'Groceries',
      month: month,
    });
    defaultTransactions.push({
      amount: Math.floor(Math.random() * 1000) + 1,
      vendor: 'Vendor B',
      type: 'Credit',
      category: 'Medical',
      month: month,
    });
  }

  return defaultTransactions;
};

module.exports.Transaction = Transaction;
module.exports.TransactionSchema = TransactionSchema;
module.exports.generateDefaultTransactions = generateDefaultTransactions();