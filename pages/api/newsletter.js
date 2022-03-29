import { connectDatabase, insertDocument } from "../../helper/db-util";

const { MongoClient } = require("mongodb");

async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Failed to connect to db!" });
      return;
    }

    try {
      await insertDocument(client, "emails", { email });
    } catch (error) {
      res.status(500).json({ message: "Failed to insert to db!" });
      return;
    }

    client.close();
    res.status(201).json({ message: "Signed Up!" });
  }
}

export default handler;
