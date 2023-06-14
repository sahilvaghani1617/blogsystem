
const express = require("express");
// const router = express.Router();
var usermodel = require('../model/usermodel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const passport = require("passport")
const upload = require("../middleware/upload")
const AVATAR_PATH = ("/uploads/user");
const fs = require("fs")
const path = require("path")
const { set } = require('mongoose');


// register

async function register(req, res) {
    // console.log(req.body);
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const phone = req.body.phone
    const useremail = await usermodel.findOne({ email: req.body.email })

    try {
        if (useremail) {
            return res.send({
                message: "user alrady exited"
            })

        }
        if (!email.includes("@")) {
            return res.send({
                message: "enter valid email!"
            })
        }
        if(password.length<5 || password.length >10 ){
            return res.send({
                massege: "enter valid password"
            })
          }
        var phoneno = /^\d{10}$/;
        
        if ((req.body.phone.match(phoneno))) {
            var bpass = await bcrypt.hash(req.body.password, 10)
            const user = new usermodel({
                name: req.body.name,
                email: req.body.email,
                password: bpass,
                phone: req.body.phone,
            });

            user.save()

            return res.send({
                message: "your data saved !"
            })
        }  
        else{
            return res.send({
                message: "enter valid phone!"
            })
        }    

    } catch(err) {
        console.log(err);
        return res.send({
            message: "something went wrong!"
        })
    }

};


// login

async function login(req, res) {
    console.log(req.body);

    try {
        const email = req.body.email
        const pass = req.body.password

        const user = await usermodel.findOne({ email: email });

        bcrypt.compare(pass, user.password, async function (err, data) {
            if (data == true) {
                console.log(user._id);

                const token = jwt.sign({ _id: user._id }, "code", { expiresIn: '1h' })

                return res.send(
                    {
                        message: "login succesfully !",
                        token: token
                    })
            }
            else {
                return res.send(
                    {
                        message: "enter valid password !"
                    }
                )
            }
        });
    }
    catch (err) {
        console.log(err);
        return res.send({
            message: "please enter valid email"
        })
    }
};


module.exports = {
    register,
    login,


}