const { MongoClient } = require("mongodb");

let db = {};
module.exports._db = db; // Export for testing purposes

async function connectToDatabase(uri) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    db.collection = client.db("feedme").collection.bind(client.db("feedme"));
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

async function saveToDatabase(document) {
  const collection = db.collection("events");
  const filter = { "header.msgId": document.header.msgId }; // Unique identifier
  const update = { $set: document }; // Update or set fields
  const options = { upsert: true }; // Upsert option

  await collection.updateOne(filter, update, options);
}

async function fetchAllData() {
  const collection = db.collection("events");
  return await collection.find({}).toArray();
}

module.exports = {
  connectToDatabase,
  saveToDatabase,
  fetchAllData,
};
