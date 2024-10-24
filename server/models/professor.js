// models/professor.js

const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  identificationNumber: { type: String, required: true },
  photo: { type: String },
  mobilePhone: { type: String, required: true },
  landlinePhone: { type: String },
  email: { type: String, required: true },
  addressStreet: { type: String },
  country: { type: String },
  postalCode: { type: String },
  generalNotes: { type: String }
});

module.exports = mongoose.model('Professor', professorSchema);
