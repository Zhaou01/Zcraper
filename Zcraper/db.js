const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const dbConnection = mongoose.connect(
  "mongodb+srv://onepiecedb.fdt1tdy.mongodb.net/OnePieceDB",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("db connected");
    else console.log("db error");
  }
);

const { Schema } = mongoose;

const characterSchema = new Schema({
  name: String,
  avatar: String,
  img: String,
});

const Character = mongoose.model("Character", characterSchema);
module.exports = Character;
module.exports = dbConnection;
