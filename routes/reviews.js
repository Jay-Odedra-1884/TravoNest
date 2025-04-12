const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const { isReviewAuthor, isLoggedIn } = require("../middleware");
const { validateReview } = require("../middleware");
const reviewController = require("../controllers/review");

//review post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//review delete route
router.delete("/:reviewId", isReviewAuthor, wrapAsync(reviewController.destroyReview)); 

module.exports = router;