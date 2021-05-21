const passport = require("passport")//The API is simple: you provide Passport a request to authenticate, and Passport provides hooks for controlling what occurs when authentication succeeds or fails
const User = require("../models/user")
passport.use(User.createStrategy())// The createStrategy is responsible to setup passport-local LocalStrategy with the correct options.
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

module.exports = passport