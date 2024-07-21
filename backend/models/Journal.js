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
    enum: ["happy", "sad", "angry", "anxious", "relaxed", "tired", "lazy"],
    required: true,
  },
  important: {
    type: Boolean,
    default: false,
  },
});

JournalSchema.pre("save", function (next) {
  this.tags = this.tags.map((tag) => tag.toLowerCase());
  this.entry = this.entry.trim();
  next();
});

JournalSchema.pre("update", function (next) {
  this.tags = this.tags.map((tag) => tag.toLowerCase());
  next();
});

JournalSchema.index({
  title: 1,
  entry: 1,
  tags: 1,
  createdAt: -1,
});

JournalSchema.virtual("year").get(function () {
  return this.date.getFullYear();
});

const Journal = mongoose.model("Journal", JournalSchema);

export default Journal;
