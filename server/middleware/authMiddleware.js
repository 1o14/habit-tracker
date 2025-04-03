const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("Token puuttuu");

  const token = authHeader.split(" ")[1]; // Tämä poistaa "Bearer"
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(403).send("Virheellinen token");
  }
};
