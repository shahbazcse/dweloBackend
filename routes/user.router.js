const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    const user = await signup(userData);

    res.status(201).json({
      message: "User Registered",
      user,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function signup(userData) {
  try {
    const foundEmail = await User.findOne({ email: userData.email });
    if (foundEmail) {
      throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    return user;
  } catch (error) {
    throw error;
  }
}

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    res.status(200).json({
      message: "User Logged In",
      user,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function login(email, password) {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User Not Found or Incorrect Email Entered");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return user;
    } else {
      throw new Error("Incorrect Password");
    }
  } catch (error) {
    throw error;
  }
}

// Add Booking
router.post("/addBooking", async (req, res) => {
  try {
    const { email, booking } = req.body;
    const user = await addBooking(email, booking);
    res.status(201).json({
      message: "Booking Added",
      booking: user.bookings,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function addBooking(email, booking) {
  try {
    const user = await User.findOne({ email: email });

    user.bookings.push(booking);
    const updatedUser = await user.save();

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

// Add Favourites
router.post("/addFavourites", async (req, res) => {
  try {
    const { email, hotel } = req.body;
    const user = await addFavourites(email, hotel);
    res.status(201).json({
      message: "Favourites Added",
      favourites: user.favourites,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function addFavourites(email, hotel) {
  try {
    const user = await User.findOne({ email: email });

    user.favourites.push(hotel);
    const updatedUser = await user.save();

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

// Remove Favourite
router.post("/removeFavourite", async (req, res) => {
  try {
    const { email, hotelId } = req.body;
    const user = await removeFavourite(email, hotelId);
    res.status(200).json({
      message: "Favourite Removed",
      favourites: user.favourites,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function removeFavourite(email, hotelId) {
  try {
    const user = await User.findOne({ email: email });

    const updatedFavourites = user.favourites.filter((hotel) => hotel._id !== hotelId)

    const updatedUser = User.findOneAndUpdate(
      { email: email },
      { favourites: updatedFavourites },
      { new: true },
    );

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

// Get User
router.get("/getUser/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUser(email);
    res.status(200).json({
      message: "User Fetched",
      user,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function getUser(email) {
  try {
    const user = await User.findOne({ email: email });

    if (!user) throw new Error("User Not Found");

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = router;
