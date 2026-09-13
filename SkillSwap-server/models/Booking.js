class Booking {
  static async create(db, bookingData) {
    const newBooking = {
      ...bookingData,
      status: bookingData.status || "pending",
      createdAt: new Date(),
    };

    const result = await db.collection("bookings").insertOne(newBooking);
    return result;
  }

  static async findByUser(db, userEmail) {
    const bookings = await db
      .collection("bookings")
      .find({ userEmail })
      .toArray();
    return bookings;
  }
}

module.exports = { Booking };
