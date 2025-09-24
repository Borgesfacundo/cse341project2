const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const app = express();
const routes = require("./routes");
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

// importing simple error handler middleware
const {
  globalErrorHandler,
  notFoundHandler,
} = require("./middleware/simpleErrorHandler");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
// This is the basic express sessession initialization
app.use(passport.initialize());
// Init passport on every route call
app.use(passport.session());
// Allow passport to use express sessions
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
app.use(cors({ methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] }));
app.use(cors({ origin: "*" }));

// Define the route for the root URL
app.use("/", routes);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
      // });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out"
  );
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

// Middleware for handling 404 and other errors
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
