const mongoose = require("mongoose");
const app = require("./bin/app");
const db = require("./bin/db");
const PORT = 3001;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((error) => {
  console.log(error.message);
  process.exit(1);
});

module.exports = db;
