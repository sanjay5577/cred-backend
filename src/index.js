
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require('winston');


mongoose 
.connect(config.mongoose.url, config.mongoose.options)
.then(() => {
    console.log("Connected to database")
    server = app.listen(config.port, () => {
        console.log(`Server listening on config.port ${config.port}`);
    })
})
.catch((err) => console.log(err));