const mongoose = require('../../config/mongo');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  currentCredit: { type: Number, min: 0, default: 0 },
  defaultCredit: { type: Number, required: true },
  // lastEntry: { type: Date, required: true },
  reloadedToday: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model('Card', CardSchema);
