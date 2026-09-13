const express = require("express");
const {
  createBooking,
  getBookings,
} = require("../controllers/bookingController");
const router = express.Router();

// Matches POST /bookings and GET /bookings
router.post("/", createBooking);
router.get("/", getBookings);

// Also matches if posted with :id parameter
router.post("/:id", createBooking);

module.exports = router;
