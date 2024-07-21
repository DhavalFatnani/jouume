import mongoose from "mongoose";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  try {
    let user = User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("User already exists", 400));
    }

    user = await User.create({
      username,
      email,
      password,
      role,
    });

    await user.save();

    res.status(201).json({
      success: true,
      data: user,
    });

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, message: "Login successful", user });

        user.lastLogin = Date.now();
        user.save();
      }
    );
  } catch (err) {
    next(err);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Get All Users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from the response
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
    next(err);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    next(err);
  }
};
