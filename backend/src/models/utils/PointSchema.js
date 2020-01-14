const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    reqired: true,
  },
  coordinates: {
    type: [Number],
    require: true,
  }
});

module.exports = PointSchema;