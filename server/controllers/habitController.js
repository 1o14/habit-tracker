const Habit = require("../models/Habit");

// Hakee kirjautuneen käyttäjän kaikki tavat (uusin ensin)
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId }).sort({ date: -1 });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: "Tietojen haku epäonnistui" });
  }
};

// Lisää uusi tapa kantaan
exports.addHabit = async (req, res) => {
  try {
    const newHabit = new Habit({
      title: req.body.title,
      userId: req.userId,
      done: req.body.done || false,
      category: req.body.category || "Muut",
      date: req.body.date || new Date(),
      recurring: req.body.recurring || "ei",
      note: req.body.note || "", 
    });

    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(500).json({ error: "Tavan lisäys epäonnistui" });
  }
};

// Päivittää olemassa olevan tavan
exports.updateHabit = async (req, res) => {
  try {
    const updates = {
      done: req.body.done,
      category: req.body.category,
      note: req.body.note, 
      recurring: req.body.recurring,
      date: req.body.date,
      title: req.body.title,
    };

    // Jos tehtävä merkataan tehdyksi, lisätään timestamp
    if (req.body.done === true) {
      updates.completedAt = new Date();
    } else if (req.body.done === false) {
      updates.completedAt = null;
    }

    const updated = await Habit.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    console.error("Päivitysvirhe:", err);
    res.status(500).json({ error: "Päivitys epäonnistui" });
  }
};

// Poistaa tavan ID:n perusteella
exports.deleteHabit = async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Tavan poistaminen epäonnistui" });
  }
};
