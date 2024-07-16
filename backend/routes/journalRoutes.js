import express from "express";
import {
  getJournals,
  getJournalById,
  createJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journalController";

const JournalRouter = express.Router();

JournalRouter.route("/").get(getJournals);
JournalRouter.route("/").post(createJournal);
JournalRouter.route("/:id").get(getJournalById);
JournalRouter.route("/:id").put(updateJournal);
JournalRouter.route("/:id").delete(deleteJournal);

export default JournalRouter;
