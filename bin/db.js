const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  process.env.NODE_ENV === "test"
    ? process.env.DB_HOST_TEST
    : process.env.DB_HOST;
const PORT = process.env.PORT || 3000;

const db = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

if (process.env.NODE_ENV !== "test") {
  mongoose.connection.on("connected", () => {
    console.log("DB connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log(`Error connection to DB with error "${err}"`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from DB");
  });
}

process.on('SIGINT', async () => {
    mongoose.connection.close(() => {
      console.log('Disconnected from DB')
      process.exit(1)
    })
  })

module.exports = db;
