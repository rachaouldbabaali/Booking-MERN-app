import express from "express";
import User from "../models/User.js";
import {
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
} from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();


router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/", verifyAdmin, getUsers);
router.get("/:id", verifyUser, getUserById);

export default router;
