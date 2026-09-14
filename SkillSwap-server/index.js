const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

const bookingRoutes = require("./routes/bookingRoutes");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.rxvswgv.mongodb.net/?appName=Cluster0`;

let client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

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

      client = localClient;
      console.log("Successfully connected to local MongoDB fallback!");
    } catch (localErr) {
      console.warn(
        "Local MongoDB connection also failed. Database operations will time out.",
      );
    }
  }

  skillSwapDatabase = client.db("skill_swap");
  app.locals.db = skillSwapDatabase;

  usersCollection = skillSwapDatabase.collection("users");
  mentorsCollection = skillSwapDatabase.collection("mentors");
  bookingsCollection = skillSwapDatabase.collection("bookings");
  reviewsCollection = skillSwapDatabase.collection("reviews");
  skillsCollection = skillSwapDatabase.collection("skills");
}

app.get("/", (req, res) => {
  res.send("SkillSwap API is running");
});

app.get("/skills", async (req, res) => {
  try {
    if (!skillsCollection) {
      return res.status(503).json({ error: "Database not connected yet" });
    }
    const search = req.query.search;
    let query = {};

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

app.get("/popular-skills", async (req, res) => {
  try {
    if (!skillsCollection) {
      return res.status(503).json({ error: "Database not connected yet" });
    }

    const popularSkills = await skillsCollection
      .find({})
      .sort({ mentorCount: -1 })
      .limit(6)
      .toArray();

    res.json(popularSkills);
  } catch (error) {
    console.error("Error fetching popular skills:", error);
    res.status(500).json({ error: "Failed to fetch popular skills" });
  }
});

app.get("/featured-mentors", async (req, res) => {
  try {
    if (!mentorsCollection) {
      return res.status(503).json({ error: "Database not connected yet" });
    }
    const featuredMentors = await mentorsCollection
      .find({})
      .sort({ sessionCount: -1 })
      .limit(3)
      .toArray();

    res.json(featuredMentors);
  } catch (error) {
    console.error("Error fetching popular skills:", error);
    res.status(500).json({ error: "Failed to fetch popular skills" });
  }
});

app.get("/mentors", async (req, res) => {
  try {
    if (!mentorsCollection) {
      return res.status(503).json({ error: "Database not connected yet" });
    }
    const search = req.query.search;
    const filterSkills = req.query.skill;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { role: { $regex: search, $options: "i" } },
          { company: { $regex: search, $options: "i" } },
          { skills: { $in: [new RegExp(search, "i")] } },
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

app.get("/mentors/:id", async (req, res) => {
  try {
    if (!mentorsCollection) {
      return res.status(503).json({ error: "Database not connected yet" });
    }
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid mentor ID" });
    }

    const query = { _id: new ObjectId(id) };
    const mentor = await mentorsCollection.findOne(query);

    if (mentor) {
      res.json(mentor);
    } else {
      res.status(404).json({ error: "Mentor not found" });
    }
  } catch (error) {
    console.error("Error fetching single mentor:", error);
    res.status(500).json({ error: "Failed to fetch the mentor" });
  }
});

app.get("/explore/skills/:id", async (req, res) => {
  try {
    if (!skillsCollection) {
      return res.status(503).json({ error: "Database not connected yet" });
    }
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid skill ID" });
    }

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
    if (!usersCollection) {
      return res.status(503).json({ error: "Database not connected yet" });
    }
    const newUser = req.body;

    if (!newUser.name || !newUser.email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const existingUser = await usersCollection.findOne({
      email: newUser.email,
    });
    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
        userId: existingUser._id,
      });
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

app.use("/bookings", bookingRoutes);
app.use("/book", bookingRoutes);

run().catch(console.dir);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
