const mongoose = require("mongoose");

const userscema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    phone : {
        type : String,
        required: true
    },

})

const user= new mongoose.model("user",userscema)

module.exports = user