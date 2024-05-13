const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/"

const connectDB = async () => {
  try {

  await  mongoose.connect(url)
  console.log("Data base Connected on Community Server!!!!!!")

  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;