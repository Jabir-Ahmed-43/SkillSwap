const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const port = 3000;
const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  serialize,
} = require("mongodb");

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.rxvswgv.mongodb.net/?appName=Cluster0`;

// 1. Change to 'let' so it can be reassigned during the local fallback
let client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// 2. Declare collections globally so your Express routes can access them
let skillSwapDatabase;
let usersCollection;
let mentorsCollection;
let bookingsCollection;
let reviewsCollection;
let skillsCollection;

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

      // This will now work without throwing an error
      client = localClient;
      console.log("Successfully connected to local MongoDB fallback!");
    } catch (localErr) {
      console.warn(
        "Local MongoDB connection also failed. Database operations will time out.",
      );
    }
  }

  // 3. Initialize the collections AFTER the connection is established.
  // This ensures they are attached to whichever client (remote or local) actually worked.
  skillSwapDatabase = client.db("skill_swap");
  usersCollection = skillSwapDatabase.collection("users");
  mentorsCollection = skillSwapDatabase.collection("mentors");
  bookingsCollection = skillSwapDatabase.collection("bookings");
  reviewsCollection = skillSwapDatabase.collection("reviews");
  skillsCollection = skillSwapDatabase.collection("skills");
}

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/skills", async (req, res) => {
  try {
    const search = req.query.search;
    const query = {};

    if (search) {
      query = {
        name: {
          $regex: search,
          $options: "i",
        },
      };
    }

    const skills = await skillsCollection.find(query).toArray();
    res.json(skills);
  } catch (error) {
    console.error("Error fetching skills", error);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

app.get("/mentors", async (req, res) => {
  try {
    const search = req.query.search;
    const filterSkills = req.query.skill;
    const query = {};
    if (search) {
      query = {
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      };
    } else if (filterSkills) {
      query = { skills: filterSkills };
    }

    const mentors = await mentorsCollection.find(query).toArray();
    res.json(mentors);
  } catch (error) {
    console.error("Error fetching mentors", error);
    res.status(500).json({ error: "Failed to fetch mentors" });
  }
});

app.get("/explore/skills/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };

    const skill = await skillsCollection.findOne(query);

    if (skill) {
      res.json(skill);
    } else {
      res.status(404).json({ error: "Skill not found" });
    }
  } catch (err) {
    console.error("Error fetching single skill: ", err);
    res.status(500).json({ err: "Failed to fetch the skill" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = req.body;

    if (!newUser.name || !newUser.email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    newUser.createAt = new Date();

    const result = await usersCollection.insertOne(newUser);

    res.status(201).json({
      message: "User saved successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error saving user: ", error);
    res.status(500).json({ error: "Failed to save user to the database" });
  }
});

run().catch(console.dir);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
