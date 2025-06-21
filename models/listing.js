const mongoose = require("mongoose");
const Review = require("./review");

//Creating scema
const listingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "city",
      "mountain",
      "beach",
      "forest",
      "desert",
      "castels",
      "house-boat",
      "amazing-pools",
      "farms",
      "island",
      "camping",
    ],
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  coordinates: {
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

//creating model on schema
const Listing = mongoose.model("Listing", listingSchema);

//exporting model
module.exports = Listing;
