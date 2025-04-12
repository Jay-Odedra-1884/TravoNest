const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const router = express.Router();
const userController = require("../controllers/user");

//user sign up routes
router.route("/sign-up")
.get(userController.signUpForm)
.post(wrapAsync(userController.signUp));

//user login routes
router.route("/login")
.get(userController.loginForm)
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}) , userController.login);

//user logout route
router.get("/logout", userController.logout);

module.exports = router