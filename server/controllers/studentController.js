// controllers/studentController.js
const Student = require('../models/Student');
const ClassOption = require('../models/Class');

// Créer un étudiant
exports.createStudent = async (req, res) => {
  try {
    const {
      name,
      surname,
      gender,
      dateOfBirth,
      identificationNumber,
      photo,
      preferredPaymentMethod,
      discount,
      phoneNumber,
      emailAddress,
      phoneHome,
      streetAddress,
      country,
      zipPostCode,
      generalNote,
      medicalNotes,
      classOptionId
    } = req.body;

    if (!name || !surname || !gender || !dateOfBirth || !phoneNumber || !emailAddress || !streetAddress || !country || !zipPostCode || !classOptionId) {
      return res.status(400).json({ message: 'Tous les champs requis doivent être fournis.' });
    }

    const classOption = await ClassOption.findById(classOptionId);
    if (!classOption) {
      return res.status(404).json({ message: 'Classe non trouvée' });
    }

    const newStudent = new Student({
      name,
      surname,
      gender,
      dateOfBirth,
      identificationNumber,
      photo,
      preferredPaymentMethod,
      discount,
      phoneNumber,
      emailAddress,
      phoneHome,
      streetAddress,
      country,
      zipPostCode,
      generalNote,
      medicalNotes,
      classOption: classOption._id
    });

    const savedStudent = await newStudent.save();
    res.status(201).json({
      message: 'Étudiant créé avec succès',
      data: savedStudent
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message || 'Erreur inconnue' });
  }
};

// Obtenir tous les étudiants
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('classOption');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message || 'Erreur inconnue' });
  }
};

// Obtenir un étudiant par ID
exports.getStudentById = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findById(studentId).populate('classOption');

    if (!student) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'étudiant', error: error.message || 'Erreur inconnue' });
  }
};

// Mettre à jour un étudiant
exports.updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const {
    name,
    surname,
    gender,
    dateOfBirth,
    identificationNumber,
    photo,
    preferredPaymentMethod,
    discount,
    phoneNumber,
    emailAddress,
    phoneHome,
    streetAddress,
    country,
    zipPostCode,
    generalNote,
    medicalNotes,
    classOptionId
  } = req.body;

  try {
    if (!name || !surname || !gender || !dateOfBirth || !phoneNumber || !emailAddress || !streetAddress || !country || !zipPostCode || !classOptionId) {
      return res.status(400).json({ message: 'Tous les champs requis doivent être fournis.' });
    }

    const classOption = await ClassOption.findById(classOptionId);
    if (!classOption) {
      return res.status(404).json({ message: 'Classe non trouvée' });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        name,
        surname,
        gender,
        dateOfBirth,
        identificationNumber,
        photo,
        preferredPaymentMethod,
        discount,
        phoneNumber,
        emailAddress,
        phoneHome,
        streetAddress,
        country,
        zipPostCode,
        generalNote,
        medicalNotes,
        classOption: classOption._id
      },
      { new: true, runValidators: true }  // Retourne le document mis à jour
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }

    res.status(200).json({
      message: 'Étudiant mis à jour avec succès',
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message || 'Erreur inconnue' });
  }
};

// Supprimer un étudiant
exports.deleteStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }

    res.status(200).json({
      message: 'Étudiant supprimé avec succès',
      data: deletedStudent
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message || 'Erreur inconnue' });
  }
};
