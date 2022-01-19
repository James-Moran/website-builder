const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');


require('dotenv').config();

var app = express();

require('./config/database.js');

require('./models/user');
require('./models/shop');

require('./config/passport')(passport);

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

/**
 * -------------- ROUTES ----------------
 */
app.use(require('./routes'));


/**
 * -------------- SERVER ----------------
 */
app.listen(8000);