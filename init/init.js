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
    intiData.data = intiData.data.map((obj) => ({...obj, owner:'67f67c48bc05d2aaf1b0108b'}));
    await Listing.insertMany(intiData.data);
    console.log("Initial Data inserted.....");
    
}

initDB();