const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const app = express();
const routes = require("./routes");

// importing simple error handler middleware
const {
  globalErrorHandler,
  notFoundHandler,
} = require("./middleware/simpleErrorHandler");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

// Define the route for the root URL
app.use("/", routes);

// Middleware de manejo de errores (DEBE IR AL FINAL)
app.use(notFoundHandler);
app.use(globalErrorHandler);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});
