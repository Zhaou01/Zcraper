const PORT = 8000;
const express = require("express");
const app = express();

const connectDB = require("./db");
const populateDb = require("./populateDb");

app.get("/", (req, res) => {
  res.send("Scraper de One Piece 🏴‍☠️");
});


const startApp = async () => {
  await connectDB();
  
  app.listen(PORT, () => console.log(`🚀 server running on PORT ${PORT}`));


  console.log("🛠️ Iniciando scraper...");
  await populateDb(); 
};

startApp();