// models/Class.js
const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  classCapacity: {
    type: Number,
    required: true,
  },
  classNumber: {
    type: Number,
    required: true,
  },
  classLevel: {
    type: String,
    required: true,
  },
  classRef: {
    type: String,
    required: true,
  }
});

const Class = mongoose.model('Class', ClassSchema);
module.exports = Class;
