import express from 'express'
import { countByCity, countByType, createHotel, deleteHotelById, getAllHotels, getHotelById, getHotelRooms, updateHotelById } from '../controllers/HotelController.js'
import {verifyAdmin} from "../utils/verifyToken.js"
import Hotel from "../models/Hotel.js";

const router = express.Router()

router.post("/", createHotel)

//UPDATE
router.put("/:id", verifyAdmin, updateHotelById);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotelById);
//GET

router.get("/find/:id", getHotelById);
//GET ALL

router.get("/", getAllHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export  default router;