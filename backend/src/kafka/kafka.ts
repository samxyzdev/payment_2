import { Kafka } from "kafkajs";
import axios from "axios";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "math-group" });

export async function produceMessatge(topic: any, message: any) {
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [{ value: message }], // this must be an array of object
  });
  await producer.disconnect();
}

export async function consumeMessages(topic: any) {
  // it can catch the pruducer message because that how kafka subscription models work system work Because its subscribe to same topic that why it receive the producer messages.
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  // consumer.run setup a loop that listen for any new messages arriving in the topic.
  await consumer.run({
    // arrow function
    eachMessage: async ({ topic, partition, message }: any) => {
      const messageValue = JSON.parse(message.value.toString()); // parse the string back to and object
      const result = callBankWebhook(messageValue);
      console.log(`Processed result: ${result}`);
    },
  });
}

async function callBankWebhook(data: any) {
  console.log("Inside the call bankwebhook form kafka.ts");

  const webhookUrl = "https://localhost:3000/api/v1/verify/bankwebhook"; // Replace with your actual bank webhook URL
  try {
    const response = await axios.post(webhookUrl, {
      ...data, // token , userId , amount
      // timestamp: new Date(),
    });
    return response.data;
  } catch (error) {
    console.error("Error calling bank webhook:", error);
  }
}
