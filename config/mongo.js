const mongoose = require('mongoose');

let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let database = process.env.DB_DATABASE;

mongoose.connect(`mongodb://${host}:${port}/${database}`, {
  useNewUrlParser: true
});

module.exports = mongoose;
