import express from "express";
import Hotel from "../models/Hotel.js";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotels,
  getHotelById,
} from "../controllers/hotel.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create a new hotel
router.post("/", verifyAdmin, createHotel);

// Update a hotel
router.put("/:id", verifyAdmin, updateHotel);

// delete a hotel
router.delete("/:id", verifyAdmin, deleteHotel);

// get all hotels
router.get("/", getHotels);

// get a hotel by id
router.get("/:id", getHotelById);

export default router;
