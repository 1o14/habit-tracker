const User = require("../models/User");

// hakee käyttäjän profiilin id:n perusteella
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Käyttäjää ei löytynyt" });
    res.json(user);
  } catch (err) {
    console.error("Profiilin hakuvirhe:", err);
    res.status(500).json({ error: "Virhe profiilin haussa" });
  }
};

// päivittää käyttäjän profiilin
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // otetaan tiedot pyynnön rungosta
    const {
      firstName,
      lastName,
      email,
      birthday,
      imageUrl, // base64 kuva
    } = req.body;

    if (!firstName || !lastName || !email) {
      return res
        .status(400)
        .json({ error: "Etunimi, sukunimi ja sähköposti ovat pakollisia." });
    }

    // päivittää kentät
    const updateData = {
      firstName,
      lastName,
      email,
      birthday,
      imageUrl: imageUrl || "", 
    };

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "Käyttäjää ei löytynyt" });
    }

    console.log("Profiili päivitetty:", updatedUser);
    res.json(updatedUser);
  } catch (err) {
    console.error("Profiilin päivitysvirhe:", err);
    res.status(500).json({ error: "Virhe profiilin tallennuksessa" });
  }
};
