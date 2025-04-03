import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";

const categories = ["Terveys", "Opiskelu", "Työ", "Uni", "Muut"];

export default function Habits({ token }) {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [category, setCategory] = useState("Terveys");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [noteInput, setNoteInput] = useState("");

  // Hae habitit
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/habits", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setHabits(res.data))
      .catch((err) => console.error("GET habits error", err));
  }, [token]);

  // Lisää uusi tapa
  const addHabit = async () => {
    if (!newHabit.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/habits",
        {
          title: newHabit,
          done: false,
          category,
          date: selectedDate,
          note: "", 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHabits([...habits, res.data]);
      setNewHabit("");
    } catch {
      alert("Tavan lisäys epäonnistui.");
    }
  };

  // Toggle tehty/ei tehty
  const toggleDone = async (id, done) => {
    const updated = habits.map((h) =>
      h._id === id ? { ...h, done: !done } : h
    );
    setHabits(updated);

    await axios.put(
      `http://localhost:5000/api/habits/${id}`,
      { done: !done },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  // Tallenna muistiinpano
  const handleSaveNote = async () => {
    if (!selectedHabit) return;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/habits/${selectedHabit._id}`,
        { note: noteInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHabits((prev) =>
        prev.map((h) => (h._id === selectedHabit._id ? res.data : h))
      );
      setSelectedHabit(null);
    } catch (err) {
      alert("Muistiinpanon tallennus epäonnistui");
    }
  };

  // Poista tapa
  const deleteHabit = async (id) => {
    await axios.delete(`http://localhost:5000/api/habits/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setHabits(habits.filter((h) => h._id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addHabit();
    }
  };

  const quotes = [
    "Tänään on loistava päivä aloittaa uusi tapa 💪",
    "Pienet teot vievät pitkälle 🌱",
    "Sinä pystyt siihen 🔥",
    "Yksi askel kerrallaan 🚶‍♀️",
  ];
  const dailyQuote = quotes[new Date().getDay() % quotes.length];
  const doneCount = habits.filter((h) => h.done).length;
  const progressPercent = habits.length
    ? Math.round((doneCount / habits.length) * 100)
    : 0;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6 fade-in">
      <h2 className="title text-3xl">To-Do Lista 🌟</h2>
      <div className="text-center text-sm italic text-gray-500">“{dailyQuote}”</div>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full transition-all"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <p className="text-center text-sm text-gray-600">
        {doneCount}/{habits.length} tehtävää suoritettu
      </p>

      {/* Uusi tehtävä */}
      <div className="flex flex-wrap items-center gap-2 relative z-10">
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Uusi tapa esim. Meditoi"
          className="input flex-grow sm:max-w-[68%]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input w-[130px]"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* Kalenteripainike */}
        <div className="relative">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="btn-icon"
            title="Valitse päivämäärä"
          >
            <FiCalendar />
          </button>
          {showCalendar && (
            <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow-xl z-20">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setShowCalendar(false);
                }}
                inline
                locale="fi"
              />
            </div>
          )}
        </div>

        <button onClick={addHabit} className="btn-icon text-xl">➕</button>
      </div>

      <p className="text-center text-sm text-gray-600">
        Valittu päivä: <strong>{selectedDate.toLocaleDateString("fi-FI")}</strong>
      </p>

      {/* Lista */}
      <ul className="divide-y bg-white rounded-xl shadow-md p-4">
        {habits.length === 0 && (
          <p className="text-sm text-center text-gray-500 mt-4">
            Lisää tehtävä ylhäältä! ✍️
          </p>
        )}
        {habits.map((habit) => (
          <li
            key={habit._id}
            className="flex justify-between items-center py-2"
          >
            <div
              className="flex items-center gap-3 cursor-pointer flex-1"
              onClick={() => {
                setSelectedHabit(habit);
                setNoteInput(habit.note || "");
              }}
            >
              <input
                type="checkbox"
                checked={habit.done}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleDone(habit._id, habit.done);
                }}
                className="w-5 h-5 text-green-500"
              />
              <span className={`text-base ${habit.done ? "line-through text-gray-400" : "text-gray-800 font-medium"}`}>
                {habit.title}
              </span>
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                {habit.category || "Muut"}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteHabit(habit._id);
              }}
              className="text-red-500 hover:underline text-sm"
            >
              Poista
            </button>
          </li>
        ))}
      </ul>

      {/* Popup muistiinpanoille */}
      {selectedHabit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold text-green-700">{selectedHabit.title}</h3>
            <p className="text-sm text-gray-600">
              Päivä: <strong>{new Date(selectedHabit.date).toLocaleDateString("fi-FI")}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Kategoria: <strong>{selectedHabit.category}</strong>
            </p>
            <textarea
              className="input w-full h-24"
              placeholder="Muistiinpanoja tälle tehtävälle..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setSelectedHabit(null)} className="btn bg-gray-200 text-gray-800 hover:bg-gray-300">
                Peruuta
              </button>
              <button onClick={handleSaveNote} className="btn">
                Tallenna
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
