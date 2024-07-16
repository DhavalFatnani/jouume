import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";

const AuthRouter = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default AuthRouter;
