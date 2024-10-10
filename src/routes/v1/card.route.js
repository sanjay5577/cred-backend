const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const userValidation = require("../../validations/user.validation");
const cardValidation = require("../../validations/card.validation");
const {cardController} = require("../../controllers");
// const { validationResult } = require('express-validator');
const router = express.Router();
// const httpStatus = require("http-status");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement a route definition for `/v1/users/:userId`

router.post("/",auth , validate(cardValidation.addCard), cardController.addCard);
router.get("/:userId",auth , validate(userValidation.getUser), cardController.getCard);

module.exports = router;