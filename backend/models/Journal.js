import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: [true, "Title Required!"],
  },
  entry: {
    type: String,
    required: [true, "Entry Required!"],
  },
  tags: {
    type: [String],
  },
  mood: {
    type: String,
    enum: ["happy", "sad", "angry", "anxious", "relaxed", "tired"],
    required: true,
  },
  important: {
    type: Boolean,
    default: false,
  },
});

const Journal = mongoose.model("Journal", JournalSchema);

export default Journal;
