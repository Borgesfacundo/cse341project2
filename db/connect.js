const dotenv = require("dotenv");
dotenv.config();

const { MongoClient } = require("mongodb");

let db;

const initDb = (callback) => {
  if (db) {
    console.log("Db is already initialized!");
    return callback(null, db);
  }
  // Mongodb error handling for missing env variable
  if (!process.env.MONGO_URI) {
    const error = new Error(
      "MONGO_URI environment variable is not defined. Please add it to your .env file."
    );
    return callback(error);
  }

  MongoClient.connect(process.env.MONGO_URI)
    .then((client) => {
      db = client;
      callback(null, db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!db) {
    throw Error("Db has not been initialized");
  }
  return db;
};

module.exports = { initDb, getDb };
