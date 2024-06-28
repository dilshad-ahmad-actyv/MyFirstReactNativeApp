const mongoose = require("mongoose");
const colors = require("colors");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Mongoose connected successfully host: ${mongoose.connection.host}`.bgCyan
        .white
    );
  } catch (error) {
    console.log(`Mongoose connection failded Error: ${error}`.bgRed.white);
  }
};
