const amqp = require("amqplib/callback_api");
const { saveToDatabase, connectToDatabase } = require("../db/database");

amqp.connect("amqp://127.0.0.1", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(async function (error1, channel) {
    if (error1) {
      throw error1;
    }
    const queue = "feedme_queue";
    channel.assertQueue(queue, { durable: false });

    await connectToDatabase("mongodb://localhost:27017");

    channel.consume(
      queue,
      async function (msg) {
        // console.log("Received message:", msg.content.toString()); // Log received message

        const jsonData = JSON.parse(msg.content.toString());
        await saveToDatabase(jsonData);

        // console.log("Processed message:", jsonData); // Log processed message
        await saveToDatabase(jsonData);
      },
      {
        noAck: true,
      }
    );
  });
});
