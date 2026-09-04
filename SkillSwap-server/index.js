const express = require("express");
require("dotenv").config();
const app = express();
const port = 3000;
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.rxvswgv.mongodb.net/?appName=Cluster0`;

//database
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } catch (err) {
    console.error(
      "MongoDB remote connection failed. Trying local fallback...",
      err.message,
    );
    try {
      const localUri = "mongodb://127.0.0.1:27017/skill_swap";
      const localClient = new MongoClient(localUri);
      await localClient.connect();
      client = localClient;
      console.log("Successfully connected to local MongoDB fallback!");
    } catch (localErr) {
      console.warn(
        "Local MongoDB connection also failed. Database operations will time out.",
      );
    }
  }
}

const skillSwapDatabase = client.db("skill_swap");
const usersCollection = skillSwapDatabase.collection("users");
const mentorsCollection = skillSwapDatabase.collection("mentors");
const bookingsCollection = skillSwapDatabase.collection("bookings");
const reviewsCollection = skillSwapDatabase.collection("reviews");
const skillsCollection = skillSwapDatabase.collection("skills");

app.get("/", (req, res) => {
  res.send("Hello world");
});

run().catch(console.dir);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
