import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: [true, "Institution Required!"],
  },
  degree: {
    type: String,
    required: [true, "Degree Required!"],
  },
  fieldOfStudy: {
    type: String,
    required: [true, "Field of study Required!"],
  },
  startDate: {
    type: Date,
    required: [true, "Start Date Required!"],
  },
  endDate: {
    type: Date,
    required: [true, "End Date Required!"],
  },
  grade: {
    type: String,
  },
});

const ExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Company Required!"],
  },
  position: {
    type: String,
    required: [true, "Position Required!"],
  },
  startDate: {
    type: Date,
    required: [true, "Start Date Required!"],
  },
  endDate: {
    type: Date,
    required: [true, "End Date Required!"],
  },
  description: {
    type: String,
  },
});

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Required!"],
  },
  description: {
    type: String,
    required: [true, "Description Required!"],
  },
  link: {
    type: String,
  },
  startDate: {
    type: Date,
    required: [true, "Start Date Required!"],
  },
  endDate: {
    type: Date,
    required: [true, "End Date Required!"],
  },
});

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Skill Name Required!"],
  },
  proficiency: {
    type: String,
    required: [true, "Skill Level Required!"],
  },
});

const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contactInfo: {
    email: {
      type: String,
      required: [true, "Email Required!"],
    },
    phone: {
      type: String,
      required: [true, "Phone Number Required!"],
    },
    address: {
      type: String,
      required: [true, "Address Required!"],
    },
    linkedIn: {
      type: String,
    },
    github: {
      type: String,
    },
  },
  summary: {
    type: String,
  },
  eduction: [EducationSchema],
  experience: [ExperienceSchema],
  projects: [ProjectSchema],
  skills: [SkillSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
