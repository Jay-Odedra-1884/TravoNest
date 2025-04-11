const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const router = express.Router();

router.get("/sign-up", (req, res) => {
    res.render("users/signup.ejs")
});

router.post("/sign-up", wrapAsync(async(req, res) => {
    try {
        const {username, email, password} = req.body;
        const newuser = new User({email, username});
        const resUser = await User.register(newuser, password);
        console.log(resUser);
        req.login(resUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to Travonest");
            res.redirect("/listing");
        })
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/sign-up");
    }
}));


router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post("/login", saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}) , async(req, res) => {
    req.flash("success", "Welcome back to Travonest");
    res.redirect(res.locals.redirectUrl || "/listing");
});

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You logged out!");
        res.redirect("/listing");
    })
})

module.exports = router