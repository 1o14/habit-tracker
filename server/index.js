const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// reitit
const authRoutes = require("./routes/authRoutes");
const habitRoutes = require("./routes/habitRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config(); // otetaan .env käyttöön

const app = express();

app.use(cors()); // sallii pyynnöt esim. frontista

app.use(express.json()); // mahdollistaa json-datan lukemisen pyynnöistä

// reitit
app.use("/api/auth", authRoutes);     // kirjautuminen
app.use("/api/habits", habitRoutes);  // to-do / habitit
app.use("/api", userRoutes);          // profiili yms.

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Serveri käynnissä portissa ${process.env.PORT}`)
  );
}).catch((err) => console.error("Mongo virhe:", err));
