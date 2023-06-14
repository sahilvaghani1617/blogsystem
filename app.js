const express = require("express");
const port = 8000;
var router = express.Router();
app = express();
const path = require("path");
require("./config/mongoose");

const userrouter = require("./router/userrouter");

const passport = require("passport");
const { urlencoded } = require("body-parser");


app.use(passport.initialize());
require("./config/passport");

app.use('/uploads',express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(urlencoded({ extended: true }));


app.use(userrouter);


app.listen(port, () => {
    console.log("server is running port "+port)
});