import express from "express";
import Room from "../models/Room.js";
import { createRoom, updateRoom, deleteRoom, getRooms, getRoomById } from "../controllers/room.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create a new room
router.post("/:hotelId", verifyAdmin, createRoom);

// Update a room
router.put("/:id", verifyAdmin, updateRoom);

// delete a room
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

// get all rooms
router.get("/", getRooms);

// get a room by id
router.get("/:id", getRoomById);


export default router;
