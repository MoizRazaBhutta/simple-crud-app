require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// This middleware is necessary to parse JSON bodies in requests
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false }));
const productRoutes = require("./routes/product.route");
// Adding Routes to the Express Application
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello, World!");
});

// Removing all routes related to products as they are now in routes/product.route.js

// MongoDB connection setup and then calling app.listen
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
