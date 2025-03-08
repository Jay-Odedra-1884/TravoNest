const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const Path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const { listingSchema } = require("./schema");

//*main function to make a connection with database
const main = async() => {
    await mongoose.connect("mongodb://127.0.0.1:27017/travonest");
}

//calling main function
main()
.then(() => {
    console.log("👉 Database connection successful 👍 ✅");
})
.catch((e) => {
    console.log("👉 Error : In DataBase connection 👎 ⛔");
    
});

app.engine('ejs', engine);
app.set("view engine", "ejs");
app.set("views", Path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(Path.join(__dirname, "/public")));
app.use(express.json());

//listing validation middlewere
const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);

    if(error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}


//*a Routes
//landing route
app.get("/", (req, res) => {
    res.send("Testing....");
});


//all list route
app.get("/listing", wrapAsync(async (req, res) => {
    const listingData = await Listing.find();
    res.render("listings/index.ejs", { datas:listingData });
}));

//*Placeing the new route before the ID route because if it's placed after, it will treat 'new' as an ID
//to add new 
app.get("/listing/new", (req, res) => {
    res.render("listings/addNewForm.ejs");
});

//list detail route 
app.get("/listing/:id" , wrapAsync(async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    res.render("listings/show.ejs", { data });
}));


//update route
app.get("/listing/:id/edit", wrapAsync(async (req,res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    res.render("listings/edit.ejs", { data });
}));

//upadate route put request
app.put("/listing/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body);
    res.redirect(`/listing/${id}`);
}));

//delete route
app.delete("/listing/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
}));


//add new post request
app.post("/addnew", validateListing, wrapAsync(async (req, res) => {
    let { title, description, image, price, location, country } = req.body;
    let newData = new Listing({
        title: title,
        description: description,
        image: image,
        price: price,
        location: location,
        country: country,
    });
    await newData.save();
    res.redirect("/listing");
}));

//to catch all unmatch route
app.all("*", (req, res, next) => {
    console.log(req.url);
    next(new ExpressError(404, "OPPS! Page not found!"));
})


//teting route
// app.get("/testing", wrapAsync(async (req, res) => {
// }));

app.use((err, req, res, next) => {
    let {statusCode, message } = err;
    res.status(statusCode).render("error.ejs", { message });
    next(err);
});

app.listen(8080, () => {
    console.log("Server startes at port : 8080 ");
})