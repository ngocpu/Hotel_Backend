import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRoute from './routes/auth.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import bookingsRoute from './routes/booking.js'
const app = express();
const PORT = 8080;

mongoose.set('strictQuery', false);

dotenv.config();
// ket noi voi db 
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

// miderware phan trung gian 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/api/v1/auth", authRoute)
app.use("/api/v1/users",usersRoute)
app.use("/api/v1/rooms", roomsRoute)
app.use("/api/v1/bookings", bookingsRoute)

// de khoi dong server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connect()
});
