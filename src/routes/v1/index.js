const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const cardRoute = require("./card.route");


const router = express.Router();

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Reroute all API requests beginning with the `/v1/users` route to Express router in user.route.js
router.use("/users", userRoute);

// TODO: CRIO_TASK_MODULE_AUTH - Reroute all API requests beginning with the `/v1/auth` route to Express router in auth.route.js 
router.use("/auth", authRoute);


// TODO: CRIO_TASK_MODULE_Cards - Reroute all API requests beginning with the `/v1/auth` route to Express router in auth.route.js 
router.use("/cards", cardRoute);

module.exports = router;