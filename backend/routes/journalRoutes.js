import express from "express";
import {
  getJournals,
  getJournalById,
  createJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journalController.js";

import auth from "../middleware/authMiddleware.js";

const JournalRouter = express.Router();

JournalRouter.post("/", auth, createJournal);
JournalRouter.get("/", auth, getJournals);
JournalRouter.get("/:id", auth, getJournalById);
JournalRouter.put("/:id", auth, updateJournal);
JournalRouter.delete("/:id", auth, deleteJournal);

export default JournalRouter;
