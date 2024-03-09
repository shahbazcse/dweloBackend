const express = require("express");
const router = express.Router();

const Hotel = require("../models/hotel.model");

// Get All Hotels
router.get("/getAllHotels", async (req, res) => {
  try {
    const hotels = await getAllHotels();
    res.status(200).json({
      message: "Hotel Fetched",
      hotels,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function getAllHotels() {
  try {
    const hotels = await Hotel.find({});

    return hotels;
  } catch (error) {
    throw error;
  }
}

// Get Hotel By Id
router.get("/getAllHotels/:hotelId", async (req, res) => {
  try {
    const { hotelId } = req.params;
    const hotel = await getHotel(hotelId);
    res.status(200).json({
      message: "Hotel Fetched",
      hotel,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function getHotel(hotelId) {
  try {
    const hotel = await Hotel.findOne({ _id: hotelId });
    if(!hotel) throw new Error("Hotel Not Found");
    return hotel;
  } catch (error) {
    throw error;
  }
}

// Add Hotels
router.post("/addHotel", async (req, res) => {
  try {
    const newHotel = req.body;
    const hotel = await addHotel(newHotel);
    res.status(201).json({
      message: "Hotel Added",
      hotel,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function addHotel(newHotel) {
  try {
    const hotels = await Hotel.find({});

    const addedHotel = new Hotel(newHotel);
    const createdHotel = await addedHotel.save();

    return createdHotel;
  } catch (error) {
    throw error;
  }
}

// Add Bookings
router.post("/addBooking", async (req, res) => {
  try {
    const { hotelId, bookingDates } = req.body;
    const hotels = await addBooking(hotelId, bookingDates);
    res.status(201).json({
      message: "Booking Dates Added",
      hotels,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function addBooking(hotelId, bookingDates) {
  try {
    const hotel = await Hotel.find({ _id: hotelId });

    if (!hotel) throw new Error("Hotel Not Found");

    const updatedHotel = Hotel.findByIdAndUpdate(
      hotelId,
      { $push: { bookedDates: bookingDates } },
      { new: true, useFindAndModify: false },
    );

    return updatedHotel;
  } catch (error) {
    throw error;
  }
}

module.exports = router;
