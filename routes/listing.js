const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateBooking } = require("../middleware");
const { validateListing } = require("../middleware");
const listingController = require("../controllers/listing");
const multer  = require('multer')
const { storage } = require("../cloudeConfig")
const upload = multer({ storage });

//all list route
router.get("/", wrapAsync(listingController.Index));

//*Placeing the new route before the ID route because if it's placed after, it will treat 'new' as an ID
//to add new
router.get("/new", isLoggedIn, listingController.createListingForm);

//add new post request
router.post(
  "/addnew",
  upload.single('listing[image]'),
  // validateListing,
  wrapAsync(listingController.createListing)
  
);

router.get(
  "/bookings",
  isLoggedIn,
  wrapAsync(listingController.showBookings)
)

//list detail route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  //upadate route put request
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateLising)
  )
  //delete route
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing)
  );

//update route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.updateLisingForm)
);

//for booing a listing
router.get("/:id/book", isLoggedIn, wrapAsync(listingController.bookListingForm));

router.post(
  "/:id/rooms",
  isLoggedIn,
  validateBooking,
  wrapAsync(listingController.availableRooms)
);

router.post(
  "/:id/book/:roomId",
  isLoggedIn,
  wrapAsync(listingController.bookRoom)
)


module.exports = router;
