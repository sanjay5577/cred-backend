const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");

/**
 * Generate jwt token
 * - Payload must contain fields
 * --- "sub": `userId` parameter
 * --- "type": `type` parameter
 *
 * - Token expiration must be set to the value of `expires` parameter
 *
 * @param {ObjectId} userId - Mongo user id
 * @param {Number} expires - Token expiration time in seconds since unix epoch
 * @param {string} type - Access token type eg: Access, Refresh
 * @param {string} [secret] - Secret key to sign the token, defaults to config.jwt.secret
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
      
  const token = jwt.sign({ sub: userId, type: type , exp:expires, iat:Date.now()/1000 }, 
    secret);

    return token;
};

/**
 * Generate auth token
 * - Generate jwt token
 * - Token type should be "ACCESS"
 * - Return token and expiry date in required format
 *
 * @param {User} user
 * @returns {Promise<Object>}
 *
 * Example response:
 * "access": {
 *          "token": "eyJhbGciOiJIUzI1NiIs...",
 *          "expires": "2021-01-30T13:51:19.036Z"
 * }
 */
const generateAuthTokens = async (user) => {

  const userId  = user._id;
  const accessTokenExpires =Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;
  const type  = tokenTypes.ACCESS;

    const generatedToken  = generateToken(userId ,accessTokenExpires , type);

    let epochTimeInMilliseconds = accessTokenExpires * 1000;
    // Create a new Date object
    let date = new Date(epochTimeInMilliseconds);
    // Format the date to a string
    // let formattedDate = date.toISOString();

    // console.log("expires" , formattedDate  , accessTokenExpires);
    const access= {
          expires: date ,
          token: generatedToken
           
  }

  console.log(access)
    return {"access" : access}

};

module.exports = {
  generateToken,
  generateAuthTokens,
};