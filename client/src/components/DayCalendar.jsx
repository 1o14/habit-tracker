import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function DayCalendar({ habits, onAdd, onDelete }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [input, setInput] = useState("");

  // 🔍 Suodata valitun päivän tehtävät
  const filtered = habits.filter(
    (h) =>
      h.date &&
      new Date(h.date).toDateString() === selectedDate.toDateString()
  );

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input, selectedDate);
    setInput("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 space-y-6">
      {/* 📅 Kalenteri ja syöttö vierekkäin leveällä */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Kalenteri */}
        <div className="w-full lg:w-1/2">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Valitse päivämäärä:
          </label>
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            locale="fi-FI"
            className="rounded-xl shadow"
          />
        </div>

        {/* Tehtävän lisääminen */}
        <div className="w-full lg:w-1/2 space-y-3">
          <label className="text-sm font-semibold text-gray-600">
            Lisää tehtävä valitulle päivälle:
          </label>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="Esim. Käy lenkillä"
              className="input flex-1"
            />
            <button onClick={handleAdd} className="btn-icon">➕</button>
          </div>
          <p className="text-sm text-center text-gray-500">
            Valittu päivä:{" "}
            <strong>{selectedDate.toLocaleDateString("fi-FI")}</strong>
          </p>
        </div>
      </div>

      {/* 📋 Tehtävälista */}
      <div>
        <h3 className="text-md font-semibold text-center text-gray-700 mb-2">
          {selectedDate.toLocaleDateString("fi-FI")} – tehtävät
        </h3>
        <ul className="space-y-2">
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-400 italic text-center">
              Ei tehtäviä tälle päivälle
            </p>
          ) : (
            filtered.map((h) => (
              <li
                key={h._id}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg shadow-sm"
              >
                <span className="text-sm">{h.title}</span>
                <button
                  onClick={() => onDelete(h._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Poista
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
