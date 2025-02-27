const mongoose = require("mongoose");
const Listing = require("../models/listing");
const intiData = require("./data");

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

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(intiData.data);
    console.log("Initial Data inserted.....");
    
}

initDB();