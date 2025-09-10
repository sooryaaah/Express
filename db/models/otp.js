const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email : {
    type : String
  }  ,
 otp : {
        type: String,
},
expiresAt : {
        type : Date,
        default : () => new Date (Date.now() +  3 * 60 * 1000),
        index: { expires: 0 }, 
    }
})

module.exports = mongoose.model("otp", otpSchema)