const net = require("net");
const transformToJSON = require("../transform/transform.js");
const { connectToDatabase, saveToDatabase } = require("../db/database");
const amqp = require("amqplib/callback_api");

async function startClient() {
  const client = new net.Socket();

  await new Promise((resolve, reject) => {
    client.connect(8282, "localhost", async function () {
      console.log("Connected to the provider service.");
      try {
        await connectToDatabase("mongodb://localhost:27017");
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });

  amqp.connect("amqp://127.0.0.1", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      const queue = "feedme_queue";
      channel.assertQueue(queue, { durable: false });

      client.on("data", async function (data) {
        const potentialPackets = data
          .toString()
          .split(/(?=\|\d+\|(create|update)\|)/);
        for (const potentialPacket of potentialPackets) {
          if (
            potentialPacket &&
            potentialPacket !== "create" &&
            potentialPacket !== "update"
          ) {
            const rawData = potentialPacket;
            console.log("Raw Data:", rawData);

            try {
              const jsonData = transformToJSON(rawData);
              console.log("Transformed Data:", jsonData);

              await saveToDatabase(jsonData);
              channel.sendToQueue(queue, Buffer.from(JSON.stringify(jsonData)));
            } catch (err) {
              console.error("Error processing packet:", err);
            }
          }
        }
      });
    });
  });

  client.on("error", function (err) {
    console.log("Error:", err);
  });

  client.on("close", function () {
    console.log("Connection closed.");
  });
}

startClient().catch((err) => console.error("An error occurred:", err));
