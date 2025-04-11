const express = require("express");
const router = express.Router();
const Listing = require("../models/listing")
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");
const { isLoggedIn, isOwner } = require("../middleware");


//listing validation middlewere
const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);

    if(error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

//all list route
router.get("/", wrapAsync(async (req, res) => {
    const listingData = await Listing.find();
    res.render("listings/index.ejs", { datas:listingData });
}));

//*Placeing the new route before the ID route because if it's placed after, it will treat 'new' as an ID
//to add new 
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/addNewForm.ejs");
});

//add new post request
router.post("/addnew",  validateListing, wrapAsync(async (req, res) => {
    let newData = new Listing(req.body.listing);
    newData.owner = res.locals.currUser._id;
    
    await newData.save();
    req.flash("success", "New listing added successfully!");
    res.redirect("/listing");
}));

//list detail route 
router.get("/:id" , wrapAsync(async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id).populate("reviews").populate("owner");
    if(!data) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listing");
    }
    res.render("listings/show.ejs", { data });
}));

//update route
router.get("/:id/edit", isLoggedIn, isOwner,  wrapAsync(async (req,res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    if(!data) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listing");
    }
    res.render("listings/edit.ejs", { data });
}));

//upadate route put request
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listing/${id}`);
}));

//delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listing");
}));

module.exports = router;
