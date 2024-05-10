import express from 'express'
import { createBooking, deleteBookingById, getAllBookings, getBookingById, updateBookingById } from '../controllers/BookingController.js'
import {verifyUser, verifyEmploy, verifyAdmin} from '../utils/verifyToken.js'

const bookingRouter = express.Router()

bookingRouter.post("/new-booking",verifyUser,createBooking)
// upadte
bookingRouter.put('/:id', verifyUser, verifyEmploy, verifyAdmin,updateBookingById)
// delete
bookingRouter.delete('/cancel-booking/:id',verifyUser,verifyEmploy, verifyAdmin, deleteBookingById)

bookingRouter.get('/:id', verifyUser, getBookingById)
bookingRouter.get('/',verifyEmploy, verifyAdmin, getAllBookings)

export default bookingRouter;