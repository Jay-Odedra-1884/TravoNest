const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const Path = require("path");
const methodOverride = require("method-override");

//*main function to make a connection with database
const main = async() => {
    await mongoose.connect("mongodb://127.0.0.1:27017/travonest");
}

//calling main function
main()
.then(() => {
    console.log("Database connection successful ✅");
})
.catch((e) => {
    console.log("Error ⛔: In DataBase connection");
    
});

app.set("view engine", "ejs");
app.set("views", Path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))


//*a Routes
//landing route
app.get("/", (req, res) => {
    res.send("Testing....");
});


//all list route
app.get("/listing", async (req, res) => {
    const listingData = await Listing.find();
    res.render("listings/index.ejs", { datas:listingData });
});

//*Placeing the new route before the ID route because if it's placed after, it will treat 'new' as an ID
//to add new 
app.get("/listing/new", (req, res) => {
    res.render("listings/addNewForm.ejs");
});

//list detail route 
app.get("/listing/:id" , async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    res.render("listings/show.ejs", { data });
});


//update route
app.get("/listing/:id/edit", async (req,res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    res.render("listings/edit.ejs", { data });
});

//upadate route put request
app.put("/listing/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body);
    res.redirect(`/listing/${id}`);
});

//delete route



//add new post request
app.post("/addnew", async (req, res) => {
    let { title, description, price, location, country } = req.body;
    let newData = new Listing({
        title: title,
        description: description,
        price: price,
        location: location,
        country: country,
    });
    await newData.save();
    res.redirect("/listing");
});

//teting route
app.get("/testing", async (req, res) => {
    // const newListing = new Listing({
    //     title:"Full house",
    //     description:"A house coverded with nature",
    //     price:2399,
    //     location:"porbandar",
    //     country:"India"
    // });

    // await newListing.save();
    res.send("data inserted successful....");
})

app.listen(8080, () => {
    console.log("Server startes at port : 8080 ");
})