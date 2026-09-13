const { Booking } = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const db = req.app.locals.db;
    if (!db) {
      return res.status(503).json({ error: "Database not connected yet" });
    }

    const newBooking = req.body;

    if (!newBooking.mentorId || (!newBooking.userId && !newBooking.userEmail)) {
      return res
        .status(400)
        .json({
          error:
            "mentorId and user identifier (userEmail or userId) are required",
        });
    }

    const result = await Booking.create(db, newBooking);

    res.status(201).json({
      message: "Session booked successfully!",
      bookingId: result.insertedId,
    });
  } catch (error) {
    console.error("Error saving booking: ", error);
    res.status(500).json({ error: "Failed to save booking to the database" });
  }
};

const getBookings = async (req, res) => {
  try {
    const db = req.app.locals.db;
    if (!db) {
      return res.status(503).json({ error: "Database not connected yet" });
    }

    const { userEmail } = req.query;
    if (userEmail) {
      const userBookings = await Booking.findByUser(db, userEmail);
      return res.json(userBookings);
    }

    const allBookings = await db.collection("bookings").find({}).toArray();
    res.json(allBookings);
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

module.exports = { createBooking, getBookings };
