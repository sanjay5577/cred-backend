const httpStatus = require("http-status");
const { Card , Statement} = require("../models");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");
const { Console } = require("winston/lib/winston/transports");
const  {generateDefaultTransactions} = require('../models/transaction.model')


// TODO: CRIO_TASK_MODULE_Card - Implement the Card service methods

/**
 * Fetches Card for a user
 * - Fetch user's Card from Mongo
 * - If Card doesn't exist, throw ApiError
 * --- status code  - 404 NOT FOUND
 * --- message - "User does not have a Card"
 *
 * @param {User} user
 * @returns {Promise<Card>}
 * @throws {ApiError}
 */
const getCardByUser = async (userId) => {
     
    const cards = await Card.find({ userId });

  if(cards){
    return cards;
  }
  else{
    throw new ApiError(httpStatus.NOT_FOUND, "User does not have a Card")
  }
};

/**
 * Adds a new product to Card
 * - Get user's Card object using "Card" model's findOne() method
 * --- If it doesn't exist, create one
 * --- If Card creation fails, throw ApiError with "500 Internal Server Error" status code
 *
 * - If product to add already in user's Card, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product already in Card. Use the Card sidebar to update or remove product from Card"
 *
 * - If product to add not in "products" collection in MongoDB, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product doesn't exist in database"
 *
 * - Otherwise, add product to user's Card
 *
 *
 *
 * @param {User} user
 * @param {string} productId
 * @param {number} quantity
 * @returns {Promise<Card>}
 * @throws {ApiError}
 * 
 */


// Luhn validation
const luhnCheck = (cardNumber) => {
  let sum = 0;
  let shouldDouble = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};


const addCard = async (user, cardData) => {
  const { cardNumber, expiryDate, nameOnCard, userId  , cvv} = cardData;
    
  
  const findcard = await Card.find({ userId ,cardNumber });

  if(findcard){
    throw new ApiError(400, "Card already added")
  }

    // Luhn validation
  if (!luhnCheck(cardNumber)) {
    throw new ApiError(400, "Invalid card number")
  }


  const card = new Card({ userId, cardNumber, expiryDate, nameOnCard , cvv});
  await card.save();

  // Generate default transactions for the last 3 months
  const defaultTransactions = generateDefaultTransactions();

  // Create a statement for each of the last 3 months
  for (const transaction of defaultTransactions) {
    const statement = new Statement({
      cardId: card._id,
      year: transaction.month.split('/')[1],
      month: transaction.month.split('/')[0],
      transactions: [transaction],
    });

    // Save the statement and update card balance
    await statement.save();
    if (transaction.type === 'Debit') {
      card.outstandingAmount += transaction.amount;
    }
  }


   return card;

};



const payCardBill =async(cardId , amount)=>{
  // Find the card by ID
  const card = await Card.findById(cardId);
  if (!card) {
    throw new ApiError(400, "Card not found")
  }

  // Check if the amount is valid (not more than the outstanding balance)
  if (amount > card.outstandingAmount) {
    throw new ApiError(400, "Payment amount exceeds outstanding balance")
  }
   

  // Update the outstanding balance
  card.outstandingAmount -= amount;
  await card.save();

  return card;

}

const getStatementByMonthYear =async(cardId, year, month)=>{
 
  const statement = await Statement.findOne({ cardId: id, year, month });
    
    if (!statement) {
      throw new ApiError(400, "Statement not found")
    }

    return statement;
}


module.exports = {
  // getCardByUser,
  addCard,
  payCardBill,
  getStatementByMonthYear,
};