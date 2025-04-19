const mongoose = require("mongoose");
const Review = require("./review");
const { string } = require("joi");
const { number } = require("joi");


//Creating scema
const listingSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    coordinates: {
        latitude: Number,
        longitude: Number,        
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

//creating model on schema
const Listing = mongoose.model("Listing", listingSchema);


//exporting model
module.exports = Listing;