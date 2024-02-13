import User from "../models/User.js";
import bcrypt from 'bcryptjs';

export const updateUser = async (req, res, next) => {
    try {
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
        }
        const user = await User.findByIdAndUpdate(req.params.id , { $set: req.body } , {new: true}); 
        if (!user) {
            return res.status(404).send({message: "User not found"});
        }

        res.status(200).send(user);
    }
    catch (error) {
        next(error);
    }
    };

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({message: "User not found"});
        }
        res.status(200).send({message: "User deleted"});
    } catch (error) {
        next(error);
    }
    };

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
    };

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({message: "User not found"});
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
    };