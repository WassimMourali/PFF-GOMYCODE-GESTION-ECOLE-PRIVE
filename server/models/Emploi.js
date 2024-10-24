const mongoose = require('mongoose');

const emploiSchema = new mongoose.Schema({
  class: { type: String, required: true },
  professor: { type: String, required: true },
  subject: { type: String, required: true },
  hoursPerWeek: { type: Number, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
  roomNumber: { type: String, required: true },
});

module.exports = mongoose.model('Emploi', emploiSchema);
