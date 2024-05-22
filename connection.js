const mongoose = require("mongoose");

function connection(path) {
  return mongoose.connect(path);
}

module.exports = connection;
