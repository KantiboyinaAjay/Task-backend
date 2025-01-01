const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Router = require('./Routes/routes');
const app = express();
const dotenv = require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", Router);

mongoose
  .connect(
    process.env.Database_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to Mongo DB");
    app.listen(8000, () => {
      console.log(`App running on port: 8000`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
