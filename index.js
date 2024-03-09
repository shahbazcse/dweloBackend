require("./db/db.connection");

const express = require("express");
const app = express();
app.use(express.json());

const userRouter = require("./routes/user.router");
const hotelRouter = require("./routes/hotel.router");

const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:3000", "https://dwelo.vercel.app"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/user", userRouter);
app.use("/hotel", hotelRouter);