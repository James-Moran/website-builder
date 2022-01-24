const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");

require("dotenv").config();

var app = express();

require("./config/database.js");

require("./models/user");
require("./models/shop");

require("./config/passport")(passport);

app.use(passport.initialize());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const whitelist = [
  "http://localhost:3000",
  "http://localhost:8000",
  "http://192.168.0.22:3000",
];

app.use(
  cors({
    credentials: true,
    preflightContinue: true,
    origin: function (origin, callback) {
      console.log("origin " + origin);
      if (!origin || true) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

/**
 * -------------- ROUTES ----------------
 */
app.use(require("./routes"));

/**
 * -------------- SERVER ----------------
 */
app.listen(8000);
