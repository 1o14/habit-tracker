import { useState } from "react";
import axios from "axios";

export default function Login({ setPage, setToken, setUsername, setUserId }) {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      // ✅ Tallennetaan käyttäjätiedot käyttöön
      setToken(res.data.token);
      setUsername(res.data.username);
      setUserId(res.data.userId);

      // ✅ Nollataan lomake ja virhe
      setUser("");
      setPassword("");
      setError("");

      // ✅ Navigoidaan eteenpäin
      setPage("habits");
    } catch (err) {
      setError("Kirjautuminen epäonnistui 😞 Tarkista tunnus ja salasana.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="animate-fadeIn space-y-4 max-w-md mx-auto mt-10 bg-white p-6 rounded-xl text-black shadow-xl"
    >
      <h2 className="text-xl font-bold mb-2 text-center text-indigo-700">
        Kirjaudu sisään
      </h2>

      <input
        className="input w-full"
        placeholder="Käyttäjätunnus"
        value={username}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        className="input w-full"
        type="password"
        placeholder="Salasana"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" className="btn w-full">
        Kirjaudu
      </button>

      {error && (
        <p className="text-sm text-red-500 text-center font-medium">{error}</p>
      )}
    </form>
  );
}
