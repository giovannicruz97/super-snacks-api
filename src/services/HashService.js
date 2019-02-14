const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 5;

function createHash(hash) {
  return bcrypt.hash(hash, saltRounds);
}

function verifyHash(inputHash, machineHash) {
  return bcrypt.compare(inputHash, machineHash);
}

function createToken(machineData) {
  return jwt.sign({ data: machineData }, process.env.APP_KEY, {
    expiresIn: '7d'
  });
}

function extractToken(token) {
  let filteredToken = token.split('Bearer ')[1];
  let decoded = jwt.decode(filteredToken);
  return decoded;
}

module.exports = { createHash, createToken, verifyHash, extractToken };
