import express from 'express'
import Stripe from "stripe";
import { verifyUser } from '../utils/verifyToken.js';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const paymentRouter = express.Router()

paymentRouter.post("/", verifyUser, async (req, res) => {
    const { paymentMethodId, amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method: paymentMethodId,
            confirm: true,
        });

        // Lấy thông tin từ body request và từ token đã xác thực
        const { checkinDate, checkOutDate, capacity, roomId } = req.body;
        const { username } = req.user;

        // Tính toán remainAmount và payment dựa trên loại thanh toán
        let paymented, remainAmount;
        if (amount === fullPrice) {
            paymented = amount;
            remainAmount = 0;
        } else {
            const room = await Room.findById(roomId);
            const fullPrice = room.price * capacity;
            paymented = amount;
            remainAmount = fullPrice - paymented;
        }

        // Tạo booking mới và lưu vào cơ sở dữ liệu
        const booking = new Booking({
            roomId,
            checkinDate,
            checkOutDate,
            capacity,
            username,
            paymented,
            remainAmount,
            status: remainAmount === 0 ? "Done" : "Progress", // Xác định trạng thái của booking
        });
        await booking.save();

        // Cập nhật trạng thái của phòng thành "Unavailable"
        await Room.findByIdAndUpdate(roomId, { status: "Unavailable" });

        res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ error: "An error occurred while processing payment" });
    }
});
export default paymentRouter