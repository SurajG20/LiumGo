const mongoose = require('mongoose');
const { Schema } = mongoose;

const DetailSchema = new Schema({
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DetailModel = mongoose.model('Details', DetailSchema);

module.exports = DetailModel;
