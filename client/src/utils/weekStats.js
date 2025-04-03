export function getWeekStats(habits) {
    const days = ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"];
    const stats = Array(7).fill(0);
  
    habits.forEach((habit) => {
      const day = new Date(habit.date).getDay();
      if (habit.done) stats[day]++;
    });
  
    return stats.map((count, i) => ({
      day: days[i],
      count,
    }));
  }
  