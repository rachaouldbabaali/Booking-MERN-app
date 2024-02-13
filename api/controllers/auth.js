import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).send("User with this email already exists");
  }

  const existingUsername = await User.findOne
    ({ username: req.body.username });
    if (existingUsername) {
        return res.status(400).send("User with this username already exists");
        }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

// login
export const login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send("User with this email does not exist");
    }
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send("Invalid password");
    }

    const token = jwt.sign(
        { _id: user._id, isAdmin: user.isAdmin },
        "TOKEN_SECRET"
    );

    const { password, isAdmin, ...others } = user._doc;
    res
        .cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        })
        .status(200)
        .json(others)
    }

// logout
export const logout = async (req, res, next) => {
    res
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: "none",
            secure: true,
        })
        .send("Logged out");
    };
