const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
mongoose.connect("mongodb://127.0.0.1:27017/blog")
.then(()=>{
    console.log("coonection succesfully");
}).catch(()=>{
    console.log("coonection fail");
})

module.exports = mongoose