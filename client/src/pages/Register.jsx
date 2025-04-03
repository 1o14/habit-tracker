import { useState } from "react";
import axios from "axios";

export default function Register({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });

      // ✅ Näytä ilmoitus ja tyhjennä kentät
      setSuccess("Tunnus luotu! Voit nyt kirjautua sisään.");
      setUsername("");
      setPassword("");

      // ⏱️ Pieni viive ennen siirtymistä (jos haluat suoraan kirjautumaan)
      setTimeout(() => {
        setPage("login");
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.error || "Rekisteröinti epäonnistui.";
      setError(msg);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="animate-fadeIn space-y-4 max-w-md mx-auto mt-10 bg-white p-6 rounded-xl text-black shadow-xl"
    >
      <h2 className="text-xl font-bold mb-2 text-center text-indigo-700">
        Luo tunnus
      </h2>

      <input
        className="input w-full"
        placeholder="Käyttäjätunnus"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        className="input w-full"
        type="password"
        placeholder="Salasana"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="btn w-full">Rekisteröidy</button>

      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}

      {success && (
        <p className="text-green-600 text-sm text-center mt-2 font-medium">
          {success}
        </p>
      )}
    </form>
  );
}
