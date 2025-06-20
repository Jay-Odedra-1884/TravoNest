const Listing = require("../models/listing")
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let review = new Review(req.body.review);
    review.author = res.locals.currUser._id;
    listing.reviews.push(review);

    await review.save();
    await listing.save();
    req.flash("success", "New review added!");
    res.status(200).redirect(`/listing/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted!");
    res.status(200).redirect(`/listing/${id}`);
};