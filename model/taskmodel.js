const mongoose = require("mongoose")

const usertask = new mongoose.Schema({
    title : {
        type  : String,
        required : true
    },
    content : {
        type  : String,
        required : true
    },
    image : {
        type  : String,
        required : true
    },
    author:{
        type:String,
        required:true
    }
},{timestamps:true,versionKey:false})

const task = new mongoose.model("task",usertask)

module.exports = task