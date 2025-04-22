const Listing = require("../models/listing");

module.exports.showAdminDashboard = async (req, res) => {
    let id = res.locals.currUser._id;
    let datas = await Listing.find({owner: id}).populate("owner");
    
    res.render("admin/admin.ejs", { datas });
}