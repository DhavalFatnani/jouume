import express from "express";
import {
  getResumes,
  getResumeById,
  generateResume,
  updateResume,
  deleteResume,
} from "../controllers/resumeController";

const ResumeRouter = express.Router();

ResumeRouter.route("/").get(getResumes);
ResumeRouter.route("/").post(generateResume);
ResumeRouter.route("/:id").get(getResumeById);
ResumeRouter.route("/:id").put(updateResume);
ResumeRouter.route("/:id").delete(deleteResume);

export default ResumeRouter;
