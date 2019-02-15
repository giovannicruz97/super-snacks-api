const mongoose = require('mongoose');

if (process.env.APP_MODE == 'test') {
  mongoose.connect(
    `mongodb://${process.env.DB_HOST_TEST}:${process.env.DB_PORT_TEST}/${
      process.env.DB_DATABASE_TEST
    }`,
    {
      useNewUrlParser: true
    }
  );
} else {
  mongoose.connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${
      process.env.DB_DATABASE
    }`,
    {
      useNewUrlParser: true
    }
  );
}

module.exports = mongoose;
