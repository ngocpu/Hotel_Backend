import Booking from "../models/Booking.js";
import Room from '../models/Room.js'
// Controller functions

// Tạo booking
export const createBooking = async (req, res) => {
  try {
    const { roomId, ...bookingData } = req.body; // Lấy roomId và còn lại là bookingData (bao gồm tên phòng)
    
    // Tìm ID của phòng dựa trên tên phòng
    const room = await Room.findOne({ title: roomId });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Tạo booking với ID của phòng
    const newBooking = new Booking({ ...bookingData, roomId: room._id });
    await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: "Error creating booking" });
  }
};

// Lấy booking bằng ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving booking" });
  }
};
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id; // Đây là ID của người dùng, bạn cần phải có cách xác định người dùng hiện tại là ai
    const bookings = await Booking.find({ userId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user bookings" });
  }
};

// Lấy tất cả các booking
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving bookings" });
  }
};

// Cập nhật booking bằng ID
export const updateBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json({ message: "Booking updated successfully", booking });
  } catch (error) {
    res.status(500).json({ error: "Error updating booking" });
  }
};

// Xóa booking bằng ID
export const deleteBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully", booking });
  } catch (error) {
    res.status(500).json({ error: "Error deleting booking" });
  }
};
