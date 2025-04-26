const Review = require("./models/review");
const { listingSchema, reviewSchema, bookingSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");
const Listing = require("./models/listing");   

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must need to Login First...");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async(req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.status(404).redirect("/listing"); 
  }
    if(res.locals.currUser && !listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error", "You are not the owner");
      return res.redirect(`/listing/${id}`);  
    }
    next();
}


module.exports.isReviewAuthor = async(req, res,next) => {
  let {id, reviewId} = req.params;
  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found");
    return res.status(404).redirect(`/listing/${id}`); 
  }
  if (res.locals.currUser && !review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review.");
    return res.redirect(`/listing/${id}`); // set status to avoid invalid status code
  }

  next();
}

//listing validation middlewere
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);

    if(error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

//server side reviews validation middleware
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);

    if(error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

module.exports.validateBooking = (req, res, next) => {
  let bookingData = req.body.booking;
  let { error } = bookingSchema.validate({
    checkin: bookingData.checkin,
    checkout: bookingData.checkout,
    guests: {
      total: bookingData.totalGuests,
      adults: bookingData.adults,
      children: bookingData.children || 0, 
    },
  });

  if (error) {
    req.flash("error", error.details[0].message);
    res.redirect(`/listing/${req.params.id}/book`);
  } else {
    next();
  }
}

