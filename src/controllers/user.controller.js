const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const jwt = require('jsonwebtoken');

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUser() function

// TODO: CRIO_TASK_MODULE_CART - Update function to process url with query params
/**
 * Get user details
 *  - Use service layer to get User data
 * 
 *  - If query param, "q" equals "address", return only the address field of the user
 *  - Else,
 *  - Return the whole user object fetched from Mongo

 *  - If data exists for the provided "userId", return 200 status code and the object
 *  - If data doesn't exist, throw an error using `ApiError` class
 *    - Status code should be "404 NOT FOUND"
 *    - Error message, "User not found"
 *  - If the user whose token is provided and user whose data to be fetched don't match, throw `ApiError`
 *    - Status code should be "403 FORBIDDEN"
 *    - Error message, "User not found"
 *
 * 
 * Request url - <workspace-ip>:8082/v1/users/6010008e6c3477697e8eaba3
 * Response - 
 * {
 *     "walletMoney": 500,
 *     "address": "ADDRESS_NOT_SET",
 *     "_id": "6010008e6c3477697e8eaba3",
 *     "name": "crio-users",
 *     "email": "crio-user@gmail.com",
 *     "password": "criouser123",
 *     "createdAt": "2021-01-26T11:44:14.544Z",
 *     "updatedAt": "2021-01-26T11:44:14.544Z",
 *     "__v": 0
 * }
 * 
 *
 * Example response status codes:
 * HTTP 200 - If request successfully completes
 * 
 *
 */
const getUser = catchAsync(async (req, res) => {
  
    const userId = req.params.userId;
    const queryParam = req.query.q;

    if (userId != req.user._id) {
      throw new ApiError(403, "User not authorized");
    }

  if (queryParam === 'address') {
    const addressInfo = await userService.getUserAddressById(userId);
    if(!addressInfo){
      throw new ApiError(httpStatus.NOT_FOUND, "Address not found");
    }

    return res.status(200).send({address :addressInfo.address}); 
  }

  else{
      
      const user = await userService.getUserById(userId);
      if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }

      return res.status(200).send(user);  
   }    
 
});



module.exports = {
  getUser,
  
};