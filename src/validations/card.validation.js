const Joi = require("joi");
const { objectId } = require("./custom.validation");

const addCard = {
  body: Joi.object().keys({
    cardNumber: Joi.number().required(),
    nameOnCard: Joi.string().required(),
    expiryDate: Joi.string().required(),
    cvv:Joi.number().required(),
    userId: Joi.string().required(),
  }),
};

const getCard = {
  params: Joi.object().keys({
    cardId : Joi.string().custom(objectId)
  }),
};

module.exports = {
  addCard,
  getCard
};