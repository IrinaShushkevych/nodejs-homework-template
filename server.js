const mongoose = require("mongoose");
const app = require("./bin/app");
const db = require('./bin/db')

db.then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });


  
  module.exports = db
