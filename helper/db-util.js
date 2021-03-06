require("dotenv").config({ path: "./.env" });
const { MongoClient } = require("mongodb");

const { mongodbUsername, mongodbPass } = process.env;
export async function connectDatabase() {
  return await MongoClient.connect(
    `mongodb+srv://${mongodbUsername}:${mongodbPass}@cluster0.hbkdn.mongodb.net/events?retryWrites=true&w=majority`
  );
}

export async function insertDocument(client, collection, document) {
  const db = await client.db();
  const result = await db.collection(collection).insertOne(document);
  console.log(result);
  return result;
}

export async function getAllDocuments(client, collection, sort, filter) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}
