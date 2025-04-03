const express = require("express");
const router = express.Router();

// Haetaan kontrollerit
const {
  getProfile,
  updateProfile
} = require("../controllers/userController");

// Hakee profiilin ID:n perusteella
router.get("/users/:id", getProfile);

// Päivittää profiilin (nimi, email, syntymäpäivä, kuva base64-muodossa)
router.put("/users/:id", updateProfile);

module.exports = router;
