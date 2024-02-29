import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
const app = express();
const PORT = 3000;


dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// miderware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connect()
});
