require("dotenv").config(); // Protect access of the mongoDB
const express = require("express"); // Framework express
const helmet = require("helmet"); // Protects against various attacks
const bodyParser = require("body-parser"); // Recovery object for POST
const mongoose = require("mongoose"); // Database MongoDB
const path = require("path"); // Provides a way of working with directories and file paths.
const app = express();
/*
 *   Routes : API
 */
const sauceRoutes = require("./routes/sauce.js");
const userRoutes = require("./routes/user.js");
/*
 *   Connection : database
 */
mongoose
  .connect(process.env.MONGO_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
/*
 *   Control : Cors and Methods
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
/*
 *   Processing requests
 */
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(helmet());
app.use(bodyParser.json());
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);
/*
 *   Execution
 */
module.exports = app;
