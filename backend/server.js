const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config(); // Load variables from .env

const app = express();
const port = process.env.PORT || 5001; // Define a port for the server to listen on

// --- Middleware ---
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend (Vite)
      "http://localhost:3000", // if CRA
      
    ],
    credentials: true,
  })
);
app.use(express.json());

// --- MongoDB Connection ---
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("✅ MongoDB database connection established successfully!");
});

// --- Import Model ---
const Suggestion = require("./schema/suggestion.model");

// --- Routes ---

// Get all suggestions
app.get("/api/suggestions", async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 });
    res.json(suggestions);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Add a new suggestion
app.post("/api/suggestions", async (req, res) => {
  try {
    const { movieTitle, reason, suggestedBy } = req.body;
    const newSuggestion = new Suggestion({
      movieTitle,
      reason,
      suggestedBy: suggestedBy || "Anonymous",
    });
    await newSuggestion.save();
    res.status(201).json({ message: "Suggestion added successfully!" });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// --- Serve Uploaded Images ---
const __dirnameValue = path.resolve();
app.use("/uploads", express.static(path.join(__dirnameValue, "uploads")));

// --- Start the Server ---
// This block makes the server run continuously on your machine
app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});
