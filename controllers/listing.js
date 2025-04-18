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
    let url = req.file.path;
    let filename = req.file.filename;
    newData.image = { url, filename };
    newData.owner = res.locals.currUser._id;
    const fullLocation = `${newData.location}, ${newData.country}`
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullLocation)}`);
    const geoData = await geoRes.json();
    const latitude = geoData[0]?.lat || 0;
    const longitude = geoData[0]?.lon || 0;

    newData.coordinates = { latitude, longitude };
    
    
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

    let originalUrl = data.image.url;
    let newUrl = originalUrl.replace("/upload", "/upload/w_250");
    

    if(!data) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listing");
    }
    res.render("listings/edit.ejs", { data, newUrl });
};

module.exports.updateLising = async (req, res) => {
    let { id } = req.params;
    let updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing);

    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = { url, filename };
    }

    const fullLocation = `${req.body.listing.location}, ${req.body.listing.country}`;
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullLocation)}`);
    const geoData = await geoRes.json();
    const latitude = geoData[0]?.lat || 0;
    const longitude = geoData[0]?.lon || 0;

    updatedListing.coordinates = { latitude, longitude };
    updatedListing.save();

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listing/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listing");
};
