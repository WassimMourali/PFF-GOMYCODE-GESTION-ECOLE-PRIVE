const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
  subjectClassf: {
    type: String,
    required: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
  creditHours: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Subject', subjectSchema);
