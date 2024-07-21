import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController.js";

import {
  updateUserProfile,
  getAllUsers,
} from "../controllers/authController.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", loginUser);
AuthRouter.put("/updateUser/:id", updateUserProfile);
AuthRouter.get("/getUser/:id", getUserProfile);
AuthRouter.get("/", getAllUsers);

export default AuthRouter;
