const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const { reviewSchema } = require("../schema");
const Listing = require("../models/listing")
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");

//server side reviews validation middleware
const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);

    if(error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

//review post route
router.post("/", validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let review = new Review(req.body.review);

    listing.reviews.push(review);

    await review.save();
    await listing.save();
    req.flash("success", "New review added!");
    res.redirect(`/listing/${listing._id}`);
}));

//review delete route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted!");
    res.redirect(`/listing/${id}`);
}));

module.exports = router;