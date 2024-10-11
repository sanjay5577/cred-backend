const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { cardService } = require("../services");

/**
 * Fetch the Card details
 *
 * Example response:
 * HTTP 200 OK
 * {
 *  "_id": "5f82eebd2b11f6979231653f",
 *  "email": "crio-user@gmail.com",
 *  "CardItems": [
 *      {
 *          "_id": "5f8feede75b0cc037b1bce9d",
 *          "product": {
 *              "_id": "5f71c1ca04c69a5874e9fd45",
 *              "name": "ball",
 *              "category": "Sports",
 *              "rating": 5,
 *              "cost": 20,
 *              "image": "google.com",
 *              "__v": 0
 *          },
 *          "quantity": 2
 *      }
 *  ],
 *  "paymentOption": "PAYMENT_OPTION_DEFAULT",
 *  "__v": 33
 * }
 * 
 *
 */
const getCard = catchAsync(async (req, res) => {
    const userId = req.params.userId;
  const card = await cardService.getCardByUser(userId); 
  res.send(card);
});


const addCard = catchAsync(async (req, res) => {

  const card = await cardService.addCard(
    req.user,
    req.body
  );

  res.status(httpStatus.CREATED).send(card);
});


const payBill= catchAsync(async (req, res) => {
  const cardId = req.params.cardId;
  const { amount } = req.body;
const card = await cardService.payCardBill(cardId , amount);
res.send(card);
});


const getStatement =catchAsync(async (req, res) => {
  const { cardId, year, month } = req.params;
  const statement = await cardService.getStatementByMonthYear(cardId, year, month);
res.send( statement);
});



module.exports = {
  getCard,
  addCard,
  payBill,
  getStatement,
};