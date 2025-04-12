const Listing = require("../models/listing");

module.exports.Index = async (req, res) => {
    const listingData = await Listing.find();
    res.render("listings/index.ejs", { datas:listingData });
};

module.exports.createListingForm = (req, res) => {
    res.render("listings/addNewForm.ejs");
}; 

module.exports.createListing = async (req, res) => {
    let newData = new Listing(req.body.listing);
    newData.owner = res.locals.currUser._id;
    
    await newData.save();
    req.flash("success", "New listing added successfully!");
    res.redirect("/listing");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id).populate({path : "reviews", populate : {path : "author"}}).populate("owner");
    
    if(!data) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listing");
    }
    res.render("listings/show.ejs", { data });
};

module.exports.updateLisingForm = async (req,res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    if(!data) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listing");
    }
    res.render("listings/edit.ejs", { data });
};

module.exports.updateLising = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listing/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listing");
};
