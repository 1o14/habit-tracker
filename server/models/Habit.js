const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date, // ✅ UUSI: merkitään koska tapa tehtiin
    default: null,
  },
  category: {
    type: String,
    enum: ["Terveys", "Työ", "Opiskelu", "Uni", "Muut"],
    default: "Muut",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  recurring: {
    type: String,
    enum: ["päivittäin", "viikoittain", "ei"],
    default: "ei",
  },
  note: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Habit", HabitSchema);
