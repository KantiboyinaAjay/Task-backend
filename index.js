const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Router = require('./Routes/routes');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());


app.use("/", Router);

mongoose
  .connect(
    "mongodb+srv://ajaykantiboyina:Ajay%406203@cluster0.vleuyp5.mongodb.net/"
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
