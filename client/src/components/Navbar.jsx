export default function Navbar({ setPage, token, setToken }) {
  return (
    <nav className="bg-indigo-900 text-white px-6 py-4 shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
      {/* Logo / Sivunimi */}
      <h1
        onClick={() => setPage("habits")}
        className="text-2xl font-bold tracking-tight cursor-pointer hover:text-green-300 transition"
      >
        🧭 Tehtävät
      </h1>

      {/* Navigointipainikkeet */}
      <div className="flex items-center gap-4 text-sm font-medium">
        {!token ? (
          <>
            <button
              onClick={() => setPage("login")}
              className="hover:text-green-300 transition"
            >
              Kirjaudu
            </button>
            <button
              onClick={() => setPage("register")}
              className="hover:text-green-300 transition"
            >
              Rekisteröidy
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setPage("habits")}
              className="hover:text-green-300 transition"
            >
              Tavat
            </button>
            <button
              onClick={() => setPage("profile")}
              className="hover:text-green-300 transition"
            >
              Profiili
            </button>
            <button
              onClick={() => {
                setToken("");
                setPage("login");
              }}
              className="text-red-300 hover:text-red-400 transition"
            >
              Kirjaudu ulos
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
