const {TransactionSchema} = require('./transaction.model')
const mongoose = require('mongoose');


const StatementSchema = new mongoose.Schema({
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true,
  },
  year: Number,
  month: Number,
  transactions: [TransactionSchema],
});

module.exports = mongoose.model('Statement', StatementSchema);
