import express from 'express';
import User from '../models/User.js';
import { updateUser, deleteUser, getUsers, getUserById } from '../controllers/user.js';
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get('/checkauthentification', verifyToken, (req, res,next) => {
    res.send('Hello World! from users');
    });

router.get('/checkuser/:id', verifyUser, (req, res,next) => {
    res.send('Hello World! from users you can delete or update your account');
    });

router.get('/checkadmin', verifyAdmin, (req, res,next) => {
    res.send('Hello World! from admins you can delete or update all accounts');
    });

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getUsers);
router.get('/:id', getUserById);

export default router;