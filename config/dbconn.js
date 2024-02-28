const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_SECRET_URL);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
