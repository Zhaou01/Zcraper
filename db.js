const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://admin:t8RrRWpJefS5yTb7@onepiecedb.fdt1tdy.mongodb.net/onepiece?retryWrites=true&w=majority";
    await mongoose.connect(uri);
    console.log(`✅ CONECTADO A MONGO ATLAS (Cluster: OnePieceApp)`);
  } catch (err) {
    console.log(`❌ ERROR DE CONEXIÓN:`, err);
    process.exit(1);
  }
};

module.exports = connectDB;