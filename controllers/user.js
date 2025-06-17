const express = require("express");
const User = require("../models/user");

module.exports.signUpForm = (req, res) => {
    res.status(200).render("users/signup.ejs")
};

module.exports.signUp = async(req, res) => {
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
            res.status(200).redirect("/listing");
        })
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/sign-up");
    }
};

module.exports.loginForm = (req, res) => {
    res.status(200).render("users/login.ejs");
};

module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back to Travonest");
    res.status(200).redirect(res.locals.redirectUrl || "/listing");
};

module.exports.logout = (req, res) => { 
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You logged out!");
        res.status(200).redirect("/listing");
    })
};