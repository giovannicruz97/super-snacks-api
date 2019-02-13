const mongoose = require('../../config/mongo');
const Schema = mongoose.Schema;

const MachineSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  hash: { type: String, required: true }
});

module.exports = mongoose.model('Machine', MachineSchema);
