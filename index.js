const express = require("express");
const formidable = require("express-formidable");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(formidable());
app.use(cors());

// Connexion à la Bdd
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Routes
const productRoutes = require("./routes/product");
app.use(productRoutes);

// Lancement du serveur
app.listen(process.env.PORT, () => {
  console.log("Server has started");
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Bienvenue dans l'API Gestion de Stock" });
  console.log("cocuouc");
});

// Route inexistante
app.all("*", (req, res) => {
  res.json({ message: "Page not found" });
});
