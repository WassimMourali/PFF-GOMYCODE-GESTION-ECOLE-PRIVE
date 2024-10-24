// controllers/affectationController.js
const Affectation = require('../models/Affectation');

// Créer une nouvelle affectation
exports.createAffectation = async (req, res) => {
  try {
    const { classId, teacherId, subjectId, studentId } = req.body;

    const newAffectation = new Affectation({
      classId,
      teacherId,
      subjectId,
      studentId,
    });

    const savedAffectation = await newAffectation.save();
    res.status(201).json(savedAffectation);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'affectation' });
  }
};

// Obtenir toutes les affectations
exports.getAllAffectations = async (req, res) => {
    Affectation.find()
    .then((staffs) => {
      res.status(200).json(staffs);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Erreur du serveur', error });
    });
};

// Obtenir une affectation par ID
exports.getAffectationById = async (req, res) => {
  try {
    const affectation = await Affectation.findById(req.params.id)
      .populate('classId', 'classRef classLevel')
      .populate('teacherId', 'name')
      .populate('subjectId', 'subjectName')
      .populate('studentId', 'firstName lastName');

    if (!affectation) {
      return res.status(404).json({ message: 'Affectation non trouvée' });
    }

    res.status(200).json(affectation);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'affectation' });
  }
};

// Supprimer une affectation
exports.deleteAffectation = async (req, res) => {
  try {
    const affectation = await Affectation.findByIdAndDelete(req.params.id);

    if (!affectation) {
      return res.status(404).json({ message: 'Affectation non trouvée' });
    }

    res.status(200).json({ message: 'Affectation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'affectation' });
  }
};
