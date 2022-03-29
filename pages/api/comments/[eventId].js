import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helper/db-util";

async function handler(req, res) {
  const { eventId } = req.query;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Failed to connect to db!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, comment } = req.body;

    if (
      !comment ||
      comment.trim() === "" ||
      !name ||
      name.trim() === "" ||
      !email.includes("@")
    ) {
      res.status(422).json({ message: "Invalid Input." });
      client.close();
      return;
    }
    const newComment = {
      email,
      name,
      comment,
      eventId,
    };

    let result;
    try {
      result = await insertDocument(client, "comments", { newComment });

      newComment.id = result.insertedId;
      res.status(201).json({ message: "added comment!", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Failed to insert to db!" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed" });
    }
  }

  client.close();
}

export default handler;
