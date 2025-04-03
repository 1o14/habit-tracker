import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FiCalendar } from "react-icons/fi";

export default function DatePickerTask({ onAdd }) {
  const [input, setInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCal, setShowCal] = useState(false);

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input, selectedDate);
    setInput("");
  };

  return (
    <div className="space-y-3">
      {/* Input + kalenteri + lisää-nappi */}
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Lisää tehtävä valitulle päivälle"
          className="input flex-grow"
        />

        {/* Kalenterinappi */}
        <button
          onClick={() => setShowCal(!showCal)}
          className="btn-icon"
          title="Valitse päivämäärä"
        >
          <FiCalendar />
        </button>

        <button
          onClick={handleAdd}
          className="btn-icon text-xl"
          title="Lisää tehtävä"
        >
          ➕
        </button>
      </div>

      {/* Valittu päivä */}
      <p className="text-center text-sm text-gray-600">
        Valittu päivä: <strong>{selectedDate.toLocaleDateString("fi-FI")}</strong>
      </p>

      {/* Kalenteri-popup */}
      {showCal && (
        <div className="bg-white p-4 rounded-xl shadow mx-auto w-fit">
          <Calendar
            onChange={(value) => {
              setSelectedDate(value);
              setShowCal(false); // sulje automaattisesti valinnan jälkeen
            }}
            value={selectedDate}
            locale="fi-FI"
          />
        </div>
      )}
    </div>
  );
}
