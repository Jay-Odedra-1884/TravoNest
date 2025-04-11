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
      return res.status(404).redirect("/listing"); // set status to avoid invalid status code
  }
    if(res.locals.currUser && !listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error", "You are not the owner");
      return res.redirect(`/listing/${id}`);  
    }
    next();
}
