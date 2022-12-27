const PORT = 8000;
const express = require("express");
const app = express();
const Character = require("./models/character.model");
const db = require("./db");
// const popuplateDb = require("./populateDb");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/all", (req, res) => {
  Character.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
