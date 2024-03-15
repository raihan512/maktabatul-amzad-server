const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
dotenv.config();
app.use(cors());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@maktabatul-amzad.vgl3kbg.mongodb.net/?retryWrites=true&w=majority&appName=Maktabatul-Amzad`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("maktabatul-amzad");
    const bookCollection = database.collection("books");

    // Book Related API Start
    app.get("/books", async (req, res) => {
      const books = await bookCollection.find().toArray();
      res.status("200").send({ books });
    });
    // Book Related API End
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Maktabatul Amzad Server is running on port ${port}`);
});
