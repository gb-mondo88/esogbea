const express = require("express");
const admin = require("../../firebase-admin-init");
const { format } = require("date-fns");
const { BOOKING_GET_ALL } = require("../../constants/routes-paths");

const bookingGetAllRouter = express.Router();

bookingGetAllRouter.get(BOOKING_GET_ALL, async (req, res) => {
  try {
    //if there is a body provided in the req, then 400 error is sent
    if (Object.keys(req.body).length !== 0)
      return res.status(400).json({
        code: "400",
        error: "Bad Request: The req's body is not allowed",
      });

    const allBookingsSnapshot = await admin
      .firestore()
      .collection("booking")
      .get();

    // If the orders snapshot is empty, then 404 error is sent
    if (allBookingsSnapshot.empty)
      return res.status(404).json({ code: "404", error: "No Booking Found" });

    // Get orders data
    let bookings = [];
    allBookingsSnapshot.forEach((doc) => {
      const docData = doc.data();

      const createdAt = docData.createdAt;
      const updatedAt = docData.updatedAt;
      const bookingDate = docData.bookingDate;

      const createdAtMilliSeconds =
        createdAt._seconds * 1000 + createdAt._nanoseconds / 1000000;

      const updatedAtMilliSeconds =
        updatedAt._seconds * 1000 + updatedAt._nanoseconds / 1000000;

      const bookingDateMilliSeconds =
        bookingDate._seconds * 1000 + bookingDate._nanoseconds / 1000000;

      docData.createdAt = format(
        createdAtMilliSeconds,
        "yyyy-MM-dd'T'HH:mm:ss.SSSX"
      );

      docData.updatedAt = format(
        updatedAtMilliSeconds,
        "yyyy-MM-dd'T'HH:mm:ss.SSSX"
      );

      docData.bookingDate = format(
        bookingDateMilliSeconds,
        "yyyy-MM-dd'T'HH:mm:ss.SSSX"
      );
      bookings.push(docData);
    });

    //Sent the cart data to user;
    return res.status(200).json({
      code: "200",
      message: "Success",
      bookingsSize: bookings.length,
      bookings: bookings,
    });
  } catch (e) {
    return res.status(500).json({
      code: "500",
      error: "Error while getting the bookings",
    });
  }
});

module.exports = bookingGetAllRouter;
