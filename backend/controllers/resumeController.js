import Resume from "../models/Resume.js";
import { validationResult } from "express-validator";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

// @route   POST api/resumes
// @desc    Create or update user's resume
// @access  Private
export const createOrUpdateResume = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    name,
    contactInfo,
    summary,
    education,
    experience,
    projects,
    skills,
    languages,
    certifications,
    hobbies,
  } = req.body;

  const resumeFields = {
    user: req.user.id,
    name,
    contactInfo,
    summary,
    experience,
    education,
    projects,
    skills,
    languages,
    certifications,
    hobbies,
  };

  try {
    let resume = await Resume.findOne({ user: req.user.id });

    if (!resume) {
      // Create
      resume = new Resume(resumeFields);
      await resume.save();
      res.json(resume);
    }

    // Update
    resume = await Resume.findOneAndUpdate(
      { user: req.user.id },
      { $set: resumeFields },
      { new: true }
    );

    return res.json(resume);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/resumes
// @desc    Get all resumes of the current user
// @access  Private
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.json(resumes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/resumes/:id
// @desc    Get single resume by ID
// @access  Private
export const getResumeById = async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);

  try {
    const resume = await Resume.findById(id);
    if (!resume) {
      return res.status(404).json({ msg: "Resume not found" });
    }

    if (resume.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    res.json(resume);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Resume not found" });
    }
    res.status(400).end({ error: error.message });
  }
};

// @route   DELETE api/resumes/:id
// @desc    Delete a resume by ID
// @access  Private
export const deleteResume = async (req, res) => {
  const id = req.params.id;

  try {
    const resume = await Resume.findById(ObjectId(id));

    if (!resume) {
      return res.status(404).json({ msg: "Resume not found" });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await resume.remove();
    res.json({ msg: "Resume removed" });
  } catch (error) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Resume not found" });
    }
    res.status(500).send("Server Error");
  }
};
