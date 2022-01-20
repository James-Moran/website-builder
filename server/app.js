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

const whitelist = ["http://localhost:3000", "http://localhost:8000"];

var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    console.log(origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

/**
 * -------------- ROUTES ----------------
 */
app.use(require("./routes"));

/**
 * -------------- SERVER ----------------
 */
app.listen(8000);
