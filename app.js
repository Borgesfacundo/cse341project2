const express = require("express");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const mongodb = require("./db/connect");
const routes = require("./routes/routes");

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

app.use("/", routes);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
  }
});
