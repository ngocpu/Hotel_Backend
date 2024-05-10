import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến ID của phòng từ model Room
      ref: 'Room', // Tham chiếu tới model Room
      required: true
    },
    checkinDate: {
      type: Date,
      required: true
    },
    checkoutDate: {
      type: Date,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    paymented: {
      type: Number,
      required: true
    },
    remainAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['Done', 'Progress', 'Cancel'], // Chỉ cho phép các giá trị nhất định
      required: true
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
