const jwt = require("jsonwebtoken")
const passport = require('passport')
const User = require('../model/usermodel')

function authuser(req, res, next) {
    passport.authenticate('jwt', { session: false }, async function (err, userData) {
        console.log( userData);
        try {
            if (err || userData === false) {
                return res.send({
                    "message": "invalid token."
                })
                // console.log(err)
            }
            req.user = userData
            return next()
        }
        catch {
            console.log("something went wrong");
        }
    })(req, res, next)
}




module.exports = {
    authuser,
}