// controllers/classController.js
const ClassModel = require('../models/Class');

// Crée une nouvelle classe
exports.createClass = (req, res) => {
  const newClass = new ClassModel(req.body);
  
  newClass.save()
    .then(savedClass => {
      res.status(201).json(savedClass);
    })
    .catch(error => {
      res.status(400).json({
        message: 'Erreur lors de la création de la classe',
        error: error.message || error
      });
    });
};

// Récupère toutes les classes
exports.getAllClasses = (req, res) => {
  ClassModel.find()
    .then(classes => {
      res.status(200).json(classes);
    })
    .catch(error => {
      res.status(500).json({
        message: 'Erreur lors de la récupération des classes',
        error: error.message || error
      });
    });
};

// Récupère une seule classe par ID
exports.getClass = (req, res) => {
  const classId = req.params.id;

  ClassModel.findById(classId)
    .then(classData => {
      if (!classData) {
        return res.status(404).json({ message: 'Classe non trouvée' });
      }
      res.status(200).json(classData);
    })
    .catch(error => {
      res.status(500).json({
        message: 'Erreur lors de la récupération de la classe',
        error: error.message || error
      });
    });
};

// Met à jour une classe
exports.updateClass = (req, res) => {
  const classId = req.params.id;
  const updatedData = req.body;

  ClassModel.findByIdAndUpdate(classId, updatedData, { new: true, runValidators: true })
    .then(updatedClass => {
      if (!updatedClass) {
        return res.status(404).json({ message: 'Classe non trouvée' });
      }
      res.status(200).json(updatedClass);
    })
    .catch(error => {
      res.status(500).json({
        message: 'Erreur lors de la mise à jour de la classe',
        error: error.message || error
      });
    });
};

// Supprime une classe
exports.deleteClass = (req, res) => {
  const classId = req.params.id;

  ClassModel.findByIdAndDelete(classId)
    .then(deletedClass => {
      if (!deletedClass) {
        return res.status(404).json({ message: 'Classe non trouvée' });
      }
      res.status(200).json({ message: 'Classe supprimée avec succès' });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Erreur lors de la suppression de la classe',
        error: error.message || error
      });
    });
};
