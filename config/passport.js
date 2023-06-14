
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require('passport')
const user = require("../model/usermodel")


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "code";
console.log(opts.secretOrKey);
passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
console.log("-------------------------------------------->");

    console.log(jwt_payload, "------------------------");
   
    console.log(jwt_payload._id);
    const userdata = await user.findById({_id: jwt_payload._id })
    console.log(userdata);
    if (userdata) {
        const userData = { user }
        return done(null, userData);

    } else {
        return res.send(done({
            "message": "something went wrong",
            result: false
        }))
    }
}));


