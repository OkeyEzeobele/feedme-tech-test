const express = require("express");
const app = express();
const PORT = 3000;
const { MongoClient } = require("mongodb");
const database = require("./db/database");
const cors = require("cors");

app.use(express.static("public"));
app.use(cors());

const MONGO_URI = "mongodb://localhost:27017"; // Adjust if your URI is different
database.connectToDatabase(MONGO_URI).catch((err) => {
  console.error("Failed to initiate MongoDB connection:", err);
  process.exit(1); // Exit the process with an error code
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/data", async (req, res) => {
  try {
    const data = await database.fetchAllData();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

module.exports = app;
