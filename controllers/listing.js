const Booking = require("../models/booking");
const Listing = require("../models/listing");
const Room = require("../models/room");
const User = require("../models/user");

module.exports.Index = async (req, res) => {
  let listingData = await Listing.find();

  try {
    const category = req.query.category;
    if (category !== undefined) {
      listingData = listingData.filter((data) => data.category === category);
    }
  } catch (err) {
    console.log(err);
  }

  try {
    const searchValue = req.query.q;
    if (searchValue !== undefined) {
      listingData = listingData.filter((data) =>
        data.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  } catch (err) {
    console.log(err);
  }

  res.render("listings/index.ejs", { datas: listingData });
};

module.exports.createListingForm = (req, res) => {
  res.render("listings/addNewForm.ejs");
};

module.exports.createListing = async (req, res) => {
  try {
    if (!req.body.listing) {
      if (req.xhr || req.headers.accept.indexOf('application/json') > -1) {
        return res.status(400).json({ error: "Form data is missing." });
      } else {
        req.flash("error", "Form data is missing.");
        return res.redirect("/listing");
      }
    }
    let newData = new Listing(req.body.listing);
    if (!req.file) {
      if (req.xhr || req.headers.accept.indexOf('application/json') > -1) {
        return res.status(400).json({ error: "Image upload failed. Try again." });
      } else {
        req.flash("error", "Image upload failed. Try again.");
        return res.redirect("/listing");
      }
    }
    let url = req.file.path;
    let filename = req.file.filename;
    newData.image = { url, filename };
    newData.owner = res.locals.currUser._id;
    const fullLocation = `${newData.location}, ${newData.country}`;

    // Try to get coordinates from geocoding API
    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          fullLocation
        )}`
      );

      let geoData = [];
      if (geoRes.ok) {
        const contentType = geoRes.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          geoData = await geoRes.json();
        }
      }
      
      if (geoData && geoData.length > 0) {
        const latitude = parseFloat(geoData[0]?.lat) || 0;
        const longitude = parseFloat(geoData[0]?.lon) || 0;
        
        if (latitude !== 0 && longitude !== 0) {
          newData.coordinates = { latitude, longitude };
        } else {
          newData.coordinates = null;
        }
      } else {
        newData.coordinates = null;
      }
    } catch (geocodingError) {
      console.error('Geocoding API error:', geocodingError);
      // Set coordinates to null when geocoding fails
      newData.coordinates = null;
    }

    await newData.save();
    if (req.xhr || req.headers.accept.indexOf('application/json') > -1) {
      return res.status(200).json({ success: true, message: "New listing added successfully!" });
    } else {
      req.flash("success", "New listing added successfully!");
      res.redirect("/listing");
    }
  } catch (err) {
    console.error('Error in createListing:', err);
    req.flash("error", "An unexpected error occurred.");
    res.redirect("/listing");
  }
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let data = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!data) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listing");
  }
  res.render("listings/show.ejs", { data });
};

module.exports.updateLisingForm = async (req, res) => {
  let { id } = req.params;
  let data = await Listing.findById(id);

  let originalUrl = data.image.url;
  let newUrl = originalUrl.replace("/upload", "/upload/w_250");

  if (!data) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listing");
  }
  res.status(200).render("listings/edit.ejs", { data, newUrl });
};

module.exports.updateLising = async (req, res) => {
  let { id } = req.params;
  let updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing);

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    updatedListing.image = { url, filename };
  }

  const fullLocation = `${req.body.listing.location}, ${req.body.listing.country}`;
  
  // Try to get coordinates from geocoding API
  try {
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        fullLocation
      )}`
    );

    let geoData = [];
    if (geoRes.ok) {
      const contentType = geoRes.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        geoData = await geoRes.json();
      }
    }
    
    if (geoData && geoData.length > 0) {
      const latitude = parseFloat(geoData[0]?.lat) || 0;
      const longitude = parseFloat(geoData[0]?.lon) || 0;
      
      if (latitude !== 0 && longitude !== 0) {
        updatedListing.coordinates = { latitude, longitude };
      } else {
        updatedListing.coordinates = null;
      }
    } else {
      updatedListing.coordinates = null;
    }
  } catch (geocodingError) {
    console.error('Geocoding API error:', geocodingError);
    // Set coordinates to null when geocoding fails
    updatedListing.coordinates = null;
  }

  updatedListing.save();

  req.flash("success", "Listing updated successfully!");
  res.status(200).redirect(`/listing/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted!");
  res.status(200).redirect("/listing");
};

//*for booking
module.exports.bookListingForm = async (req, res) => {
  let { id } = req.params;
  let data = await Listing.findById(id).populate("owner");
  if (!data) {
    req.flash("error", "Listing not found!");
    return res.status(404).redirect("/listing");
  }
  res.status(200).render("listings/book.ejs", { data });
};

module.exports.availableRooms = async (req, res) => {
  let { id } = req.params;
  let bookingData = req.body.booking;
  let listing = await Listing.findById(id).populate({
    path: "rooms",
    populate: {
      path: "bookings",
    },
  });
  let isAvilable = true;
  let availableRooms = [];

  for (let room of listing.rooms) {
    if (room && room.bookings) {
      isAvilable = room.bookings.every(
        (b) =>
          new Date(b.checkin) >= new Date(bookingData.checkout) ||
          new Date(b.checkout) <= new Date(bookingData.checkin)
      );
      if (isAvilable) {
        availableRooms.push(room);
      }
    }
  }

  if (availableRooms.length === 0) {
    req.flash("error", "This listing rooms is not available for the selected dates!");
    return res.status(200).redirect(`/listing/${id}/book`);
  }

  // let newBooking = {
  //   checkin: new Date(bookingData.checkin),
  //   checkout: new Date(bookingData.checkout),
  //   username: "Jay",
  //   guests: {
  //       total: bookingData.totalGuests,
  //       adults: bookingData.adults,
  //       children: bookingData.children || 0
  //   },
  //   customer: res.locals.currUser._id,
  // };

  // listing.bookings.push(newBooking);

  // listing.save();
  res.render("listings/showRooms.ejs", { availableRooms, id, bookingData });
};

module.exports.bookRoom = async (req, res) => {
  const bookingData = req.body.booking;
  const payment = {
    payment_id: req.body.razorpay_payment_id,
    order_id: req.body.razorpay_order_id,
    signature: req.body.razorpay_signature,
  };

  let { id, roomId } = req.params;
  let listing = await Listing.findById(id).populate("rooms");
  let room = await Room.findById(roomId).populate("bookings");
  let newBooking = new Booking({
    checkin: new Date(bookingData.checkin),
    checkout: new Date(bookingData.checkout),
    guests: {
      total: bookingData.totalGuests,
      adults: bookingData.adults,
      children: bookingData.children || 0,
    },
    customer: res.locals.currUser._id,
  });

  let user = await User.findById(res.locals.currUser._id);
  user.bookedListing.push(listing._id);
  user.save();

  await newBooking.save();
  await room.bookings.push(newBooking._id);
  await room.save();

  res.status(200).render("payment/success.ejs", { payment });
};

module.exports.showBookings = async(req, res) => {
  let userId = res.locals.currUser._id;
  
  let user = await User.findById(userId).populate({
    path: "bookedListing",
    populate: {
      path: "rooms",
      populate: {
        path: "bookings",
        match: { customer: userId } // Only get bookings for this user
      }
    }
  });
  
  // Filter out listings that don't have any bookings
  const bookingData = user.bookedListing.filter(listing => {
    return listing.rooms.some(room => room.bookings && room.bookings.length > 0);
  });
  
  res.status(200).render("listings/myBookings.ejs", { 
    bookingData,
    userId 
  });
}
