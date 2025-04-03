import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function HabitCalendar({ habits }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [completedDates, setCompletedDates] = useState([]);
  const [habitsForDate, setHabitsForDate] = useState([]);

  // 🔄 Kerää suoritetut päivämäärät
  useEffect(() => {
    const done = habits
      .filter((h) => h.done && h.completedAt)
      .map((h) => new Date(h.completedAt).toDateString());
    setCompletedDates(done);
  }, [habits]);

  // 🔍 Päivämäärän valinta
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const filtered = habits.filter((h) => {
      const d = h.completedAt ? new Date(h.completedAt).toDateString() : "";
      return h.done && d === date.toDateString();
    });
    setHabitsForDate(filtered);
  };

  // 🔵 Merkkaa pisteellä suoritetut päivät
  const getTileContent = ({ date, view }) => {
    if (view === "month") {
      const d = date.toDateString();
      if (completedDates.includes(d)) {
        return <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1"></div>;
      }
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4 mt-8">
      <h3 className="text-lg font-semibold text-center text-blue-800">Suoritetut tehtävät</h3>

      {/* 📅 Kalenteri */}
      <Calendar
        value={selectedDate}
        onClickDay={handleDateClick}
        tileContent={getTileContent}
        locale="fi-FI"
        className="rounded-xl mx-auto shadow"
      />

      {/* ✅ Listaus valitun päivän tehtävistä */}
      <div className="text-center mt-4">
        <h4 className="font-medium text-gray-700">
          {selectedDate.toLocaleDateString("fi-FI")} – suoritetut tehtävät:
        </h4>
        {habitsForDate.length === 0 ? (
          <p className="text-sm text-gray-500 mt-2">Ei suorituksia valitulle päivälle</p>
        ) : (
          <ul className="mt-3 space-y-1 text-sm text-gray-800 text-left max-w-md mx-auto">
            {habitsForDate.map((h) => (
              <li key={h._id} className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded">
                <span>✅ {h.title}</span>
                <span className="text-xs text-gray-500">({h.category})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
