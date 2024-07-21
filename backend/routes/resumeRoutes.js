import express from "express";
import {
  getResumes,
  getResumeById,
  createOrUpdateResume,
  deleteResume,
} from "../controllers/resumeController.js";
import auth from "../middleware/authMiddleware.js";

const ResumeRouter = express.Router();

ResumeRouter.get("/", auth, getResumes);
ResumeRouter.post("/", auth, createOrUpdateResume);
ResumeRouter.get("/:id", auth, getResumeById);
ResumeRouter.delete("/:id", auth, deleteResume);

export default ResumeRouter;
