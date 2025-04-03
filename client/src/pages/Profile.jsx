import { useState, useEffect } from "react";

export default function Profile({ username, userId, token }) {
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: username || "",
    birthday: "",
    imageUrl: "https://via.placeholder.com/120?text=Profiili", // oletuskuva
  });

  // haetaan profiilitiedot
  useEffect(() => {
    if (!userId) return;

    const saved = localStorage.getItem("profile");
    if (saved) {
      setForm(JSON.parse(saved));
      return;
    }

    fetch(`http://localhost:5000/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setForm((prev) => ({
          ...prev,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || username || "",
          birthday: data.birthday || "",
          imageUrl: data.imageUrl || "https://via.placeholder.com/120?text=Profiili",
        }));
      })
      .catch((err) => console.error("Profiilin haku epäonnistui:", err));
  }, [userId, token, username]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // kun valitaan kuva, se muutetaan base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        imageUrl: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setEditMode(false);
    setError("");
    const saved = localStorage.getItem("profile");
    if (saved) {
      setForm(JSON.parse(saved));
    }
  };

  const handleSave = async () => {
    if (!form.firstName || !form.lastName || !form.email) {
      setError("Etunimi, sukunimi ja sähköposti ovat pakollisia kenttiä.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated?.error || "Virhe tallennuksessa");

      localStorage.setItem("profile", JSON.stringify(updated));
      setForm(updated);
      setEditMode(false);
      setError("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Profiilin tallennus epäonnistui");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8 fade-in">
      <h2 className="text-2xl font-bold text-green-600 text-center mb-8">
        Profiilisivu
      </h2>

      {success && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded text-center font-semibold mb-4">
          Profiili tallennettu onnistuneesti!
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* vasen: kuva + esikatselu */}
        <div className="bg-gray-50 rounded-xl shadow p-6 flex flex-col items-center md:w-1/3 space-y-3">
          <label htmlFor="profile-pic" className="relative group cursor-pointer">
            <img
              src={form.imageUrl}
              alt="Profiilikuva"
              className="w-28 h-28 rounded-full object-cover shadow-md border-2 border-green-400 group-hover:opacity-80 transition duration-200"
            />
            {editMode && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white rounded-full opacity-0 group-hover:opacity-100 transition">
                Vaihda kuva
              </div>
            )}
          </label>
          {editMode && (
            <input
              type="file"
              id="profile-pic"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          )}

          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              {form.firstName} {form.lastName}
            </h3>
            <p className="text-sm text-gray-500">{form.email}</p>
          </div>

          {!editMode ? (
            <button onClick={() => setEditMode(true)} className="btn w-full mt-2">
              Muokkaa
            </button>
          ) : (
            <div className="flex gap-2 mt-2">
              <button onClick={handleSave} className="btn px-4">
                Tallenna
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-gray-300"
              >
                Peruuta
              </button>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
        </div>

        {/* oikea: lomakekentät */}
        <div className="bg-gray-50 rounded-xl shadow p-6 flex-1 space-y-4">
          {[{ label: "Etunimi", field: "firstName", required: true },
          { label: "Sukunimi", field: "lastName", required: true },
          { label: "Sähköposti", field: "email", type: "email", required: true },
          { label: "Syntymäpäivä", field: "birthday", type: "date" }].map(
            ({ label, field, type = "text", required }) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={type}
                  className="input"
                  value={form[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  disabled={!editMode}
                  required={required}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
