const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const adminController = require("../controllers/admin");
const { isLoggedIn } = require("../middleware");

router.get("/", isLoggedIn, wrapAsync(adminController.showAdminDashboard));

module.exports = router;