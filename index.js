const PORT = 8000;
const express = require("express");
const app = express();

const db = require("./db");
//const popuplateDb = require("./populateDb");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
