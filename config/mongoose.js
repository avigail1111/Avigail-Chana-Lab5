const mongoose = require("mongoose");

require("dotenv").config();
//jhgfjhvh
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    auth: {
      user: process.env.MONGO_DB_USER,
      password: process.env.MONGO_DB_PASS,
    },
  })
  .catch((error) => console.log(error));
  
mongoose.connection.on("connected", () => {
  console.log("Mongoose Connected to MongoDB.");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

module.exports = mongoose;
