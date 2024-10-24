// controllers/professorController.js
const Professor = require('../models/professor');

// Crée un nouveau professeur
exports.createProfessor = async (req, res) => {
    try {
        const professor = new Professor(req.body);
        const savedProfessor = await professor.save();
        res.status(201).json(savedProfessor);
    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de la validation des données du professeur',
            error: error.message || 'Erreur inconnue'
        });
    }
};

// Récupère tous les professeurs
exports.getProfessors = async (req, res) => {
    try {
        const professors = await Professor.find();
        res.status(200).json(professors);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des professeurs',
            error: error.message || 'Erreur inconnue'
        });
    }
};

// Récupère un professeur par ID
exports.getProfessorById = async (req, res) => {
    const professorId = req.params.id;

    try {
        const professor = await Professor.findById(professorId);

        if (!professor) {
            return res.status(404).json({ message: 'Professeur non trouvé' });
        }

        res.status(200).json(professor);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération du professeur',
            error: error.message || 'Erreur inconnue'
        });
    }
};

// Met à jour un professeur
exports.updateProfessor = async (req, res) => {
    const professorId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedProfessor = await Professor.findByIdAndUpdate(professorId, updatedData, {
            new: true,
            runValidators: true
        });

        if (!updatedProfessor) {
            return res.status(404).json({ message: 'Professeur non trouvé' });
        }

        res.status(200).json(updatedProfessor);
    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de la mise à jour du professeur',
            error: error.message || 'Erreur inconnue'
        });
    }
};

// Supprime un professeur
exports.deleteProfessor = async (req, res) => {
    const professorId = req.params.id;

    try {
        const deletedProfessor = await Professor.findByIdAndDelete(professorId);

        if (!deletedProfessor) {
            return res.status(404).json({ message: 'Professeur non trouvé' });
        }

        res.status(200).json({ message: 'Professeur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la suppression du professeur',
            error: error.message || 'Erreur inconnue'
        });
    }
};
