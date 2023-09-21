// database.test.js

const db = require("../src/db/database");
const mockData = {
  header: {
    msgId: "2054",
    operation: "create",
    type: "event",
    timestamp: "1497359166352",
  },
  body: {
    eventId: "test-id",
    category: "Football",
    subCategory: "Test League",
    name: "Test Match",
    startTime: "1497359216693",
    displayed: false,
    suspended: true,
  },
};

test("should connect to database", async () => {
  await db.connectToDatabase(
    process.env.MONGO_URI || "mongodb://localhost:27017"
  );
  // No errors means the connection was successful
});

test("should save document to database", async () => {
  await db.saveToDatabase(mockData);
  // If there's no error thrown, it means the data was saved successfully
});

test("should fetch all data from database", async () => {
  const data = await db.fetchAllData();
  expect(data).toBeTruthy(); // check if data is retrieved
  expect(data.length).toBeGreaterThan(0); // check if at least one record exists
});

