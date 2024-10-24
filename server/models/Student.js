const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  gender: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  dateOfBirth: { type: Date, required: true },
  identificationNumber: { type: String, required: false },
  photo: { type: String, required: false },
  preferredPaymentMethod: { type: String, required: false },
  discount: { type: Number, required: false },
  phoneNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  phoneHome: { type: String, required: false },
  streetAddress: { type: String, required: true },
  country: { type: String, required: true },
  zipPostCode: { type: String, required: true },
  generalNote: { type: String, required: false },
  medicalNotes: { type: String, required: false },
  classOption: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  }
});

module.exports = mongoose.model('Student', studentSchema);
