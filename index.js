const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

// middle ware
app.use(cors());
app.use(express.json());

// get api
app.get("/", (req, res) => {
  res.send("get api is working");
});

// mongo db
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.vhnnfcc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    // user register data collection
    const userLoginCollection = client
      .db("UserRegisterData")
      .collection("RegisterData");

    app.post("/userRegister", async (req, res) => {
      const userData = req.body;
      console.log(userData);
      const result = await userLoginCollection.insertOne(userData);
      res.send(result);
    });

    // social media login
    app.get("/socialLogin/:email", async (req, res) => {
      const email = req.params.email;
      console.log(email);
      const query = { email: email };
      const curser = userLoginCollection.find(query);
      const result = await curser.toArray();
      const arraysLength = result;
      if (arraysLength.length > 0) {
        return res.send("old user");
      }
      const newUser = {
        email: email,
        name: email,
        accountType: "Buyer",
      };
      console.log(email)
      const createUser = await userLoginCollection.insertOne(newUser);
      res.send(createUser);
      console.log(createUser);
    });
  } finally {
  }
}

run().catch((error) => {
  console.log(error);
});

// api listening
app.listen(port, () => {
  console.log(`api listening port is ${port}`);
});
