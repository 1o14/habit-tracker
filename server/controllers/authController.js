const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const existing = await User.findOne({ username: req.body.username });
    if (existing) return res.status(400).json({ error: "Käyttäjänimi on jo varattu" });

    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = new User({ username: req.body.username, password: hashed });
    await user.save();
    res.status(201).json({ message: "Käyttäjä luotu onnistuneesti" });
  } catch (err) {
    console.error("❌ Rekisteröinti error:", err);
    res.status(500).json({ error: "Rekisteröinti epäonnistui" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({ error: "Käyttäjää ei löydy" });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(401).json({ error: "Väärä salasana" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    // Lisätään userId vastaukseen
    res.status(200).json({ token, username: user.username, userId: user._id });
  } catch (err) {
    console.error("❌ Kirjautuminen error:", err);
    res.status(500).json({ error: "Kirjautuminen epäonnistui" });
  }
};

