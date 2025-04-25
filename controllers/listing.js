const Booking = require("../models/booking");
const Listing = require("../models/listing");
const Room = require("../models/room");

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
  let newData = new Listing(req.body.listing);
  let url = req.file.path;
  let filename = req.file.filename;
  newData.image = { url, filename };
  newData.owner = res.locals.currUser._id;
  const fullLocation = `${newData.location}, ${newData.country}`;
  const geoRes = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      fullLocation
    )}`
  );
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
  res.render("listings/edit.ejs", { data, newUrl });
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
  const geoRes = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      fullLocation
    )}`
  );
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

//*for booking
module.exports.bookListingForm = async (req, res) => {
  let { id } = req.params;
  let data = await Listing.findById(id).populate("owner");
  if (!data) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listing");
  }
  res.render("listings/book.ejs", { data });
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
    return res.redirect(`/listing/${id}/book`);
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

  console.log("Payment data:", payment);

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

  await newBooking.save();
  await room.bookings.push(newBooking._id);
  await room.save();

  res.render("payment/success.ejs", { payment });
};
