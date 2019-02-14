const mongoose = require('../../config/mongo');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, min: 2, max: 5.5, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);
