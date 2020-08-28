const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const users = require("./routes/api/users");
const bodyParser = require("body-parser");
const passport = require("passport");
const names = require("./routes/names");
const axios = require('axios');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const namesRouter = require('./routes/names');

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use('/exercises', exercisesRouter);
app.use('/names', namesRouter);

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
