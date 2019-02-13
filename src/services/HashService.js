const bcrypt = require('bcrypt');
const saltRounds = 5;

function createHash(hash) {
  return bcrypt.hash(hash, saltRounds);
}

module.exports = { createHash };
