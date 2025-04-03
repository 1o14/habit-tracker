import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Habits from "./pages/Habits";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";

export default function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <div className="min-h-screen bg-[#f2f5f7] text-gray-800 font-sans">
      <Navbar setPage={setPage} token={token} setToken={setToken} />
      <div className="p-4">
        {page === "login" && (
          <Login
            setPage={setPage}
            setToken={setToken}
            setUsername={setUsername}
            setUserId={setUserId} // 🔹 VIEDÄÄN LOGINILLE
          />
        )}
        {page === "register" && <Register setPage={setPage} />}
        {page === "habits" && token && <Habits token={token} />}
        {page === "profile" && token && (
          <Profile username={username} userId={userId} />
        )}
        {!token && page === "habits" && (
          <p className="text-center">Kirjaudu ensin sisään!</p>
        )}
      </div>
    </div>
  );
}
