const mongoose = require("mongoose");
function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Conected to database successfully");
    })
    .catch((error) => {
      console.log("Error conecting to Database", error);
    });
}

module.exports = connectDB;
