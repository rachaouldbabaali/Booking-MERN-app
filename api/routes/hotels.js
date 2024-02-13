import express from "express";
import Hotel from "../models/Hotel.js";
import { createHotel, updateHotel, deleteHotel, getHotels, getHotelById } from "../controllers/hotel.js";


const router = express.Router();

// Create a new hotel
router.post("/", createHotel);

// Update a hotel
router.put("/:id", updateHotel);

// delete a hotel
router.delete("/:id", deleteHotel);

// get all hotels
router.get("/", getHotels);

// get a hotel by id
router.get("/:id", getHotelById);

export default router;
