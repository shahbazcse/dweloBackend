const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  country: {
    name: String,
    isoCode: String,
    flag: String,
    phonecode: String,
    currency: String,
    latitude: String,
    longitude: String,
    timezones: [
      {
        zoneName: String,
        gmtOffset: Number,
        gmtOffsetName: String,
        abbreviation: String,
        tzName: String,
      },
    ],
  },
  addressLineOne: String,
  addressLineTwo: String,
  city: {
    name: String,
    countryCode: String,
    stateCode: String,
    latitude: String,
    longitude: String,
  },
  state: {
    name: String,
    isoCode: String,
    countryCode: String,
    latitude: String,
    longitude: String,
  },
  postCode: String,
});

const floorPlanSchema = new mongoose.Schema({
  guests: Number,
  bedrooms: Number,
  beds: Number,
  bathroomsNumber: Number,
});

const hotelSchema = new mongoose.Schema(
  {
    bookedDates: [
      {
        checkIn: String,
        checkOut: String,
      },
    ],
    location: locationSchema,
    floorPlan: floorPlanSchema,
    author: String,
    status: String,
    amenities: [String],
    photos: [String],
    highlight: [String],
    security: [String],
    ratings: Number,
    houseType: String,
    privacyType: String,
    title: String,
    description: String,
    guestType: String,
    authorEarnedPrice: Number,
    basePrice: Number,
    priceAfterTaxes: Number,
  },
  {
    timestamps: true,
  },
);

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
