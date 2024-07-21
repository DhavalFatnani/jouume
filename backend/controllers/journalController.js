import Journal from "./../models/Journal.js";

// @route   POST /api/journals
// @desc    Create a new journal entry
// @access  Private
export const createJournal = async (req, res) => {
  const { title, entry, tags, mood, important } = req.body;

  const _date = Date.now();

  try {
    const newJournal = new Journal({
      user: req.user.id,
      title,
      entry,
      tags,
      mood,
      important,
      createdAt: _date,
    });

    const journal = await newJournal.save();
    res.status(201).json(journal);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// @route   GET /api/journals
// @desc    Get all journals for the logged-in user
// @access  Private
export const getJournals = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};
  results.next = {
    page: page + 1,
    limit: limit,
  };
  results.previous = {
    page: page - 1,
    limit: limit,
  };

  try {
    const totalJournals = await Journal.countDocuments({ user: req.user.id });
    const journals = await Journal.find({ user: req.user.id })
      .sort({
        date: -1,
      })
      .skip(startIndex)
      .limit(limit);
    res.status(200).json({
      totalItems: totalJournals,
      totalPages: Math.ceil(totalJournals / limit),
      currentPage: page,
      journals,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// @route   GET /api/journals/:id
// @desc    Get a single journal entry by ID
// @access  Private
export const getJournalById = async (req, res) => {
  const JournalId = req.params.id;

  try {
    const journal = await Journal.findById(ObjectId(JournalId));
    if (!journal) {
      res.status(404).json({ message: "Journal not found" });
    }
    res.status(200).json(journal);
  } catch (error) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Journal entry not found" });
    }
    res.status(500).send({ message: error.message });
  }
};

// @route   PUT /api/journals/:id
// @desc    Update a journal entry
// @access  Private
export const updateJournal = async (req, res) => {
  const JournalId = req.params.id;

  try {
    const journal = await Journal.findById(ObjectId(JournalId));
    if (!journal) {
      res.status(404).json({ message: "Journal not found" });
    }

    if (journal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized" });
    }

    journal.title = req.body.title || journal.title;
    journal.entry = req.body.entry || journal.entry;
    journal.tags = req.body.tags || journal.tags;
    journal.mood = req.body.mood || journal.mood;
    journal.important = req.body.important || journal.important;

    const updatedJournal = await journal.save();
    res.status(200).json(updatedJournal);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Journal entry not found" });
    }
    res.status(500).send({ message: error.message });
  }
};

// @route   DELETE /api/journals/:id
// @desc    Delete a journal entry
// @access  Private
export const deleteJournal = async (req, res) => {
  const JournalId = req.params.id;

  try {
    const journal = await Journal.findById(ObjectId(JournalId));
    if (!journal) {
      res.status(404).json({ message: "Journal not found" });
    }

    if (journal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await journal.remove();
    res.status(200).json({ message: "Journal entry removed" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Journal entry not found" });
    }
    res.status(500).send({ message: error.message });
  }
};
