const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  img: { type: String, required: true },
});

characterSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
