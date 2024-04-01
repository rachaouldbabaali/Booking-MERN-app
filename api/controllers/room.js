import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const { hotelId } = req.params;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      const hotel = await Hotel.findByIdAndUpdate(
        hotelId,
        { $push: { rooms: savedRoom._id } },
        { new: true }
      );
    } catch (error) {
      next(createError(500, error.message));
    }
    res.status(201).json(savedRoom);
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const updateRoom = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const getRoomById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    if (!room) {
      return next(createError(404, "Room not found"));
    }
    res.status(200).json(room);
  } catch (error) {
    next(createError(500, error.message));
  }
};
