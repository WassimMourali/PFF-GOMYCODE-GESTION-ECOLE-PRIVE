// controllers/subjectController.js
const SubjectModel = require('../models/subject');

// Récupère le dernier code de sujet
exports.getLastSubjectCode = async (req, res) => {
    try {
        const lastSubject = await SubjectModel.findOne().sort({ subjectCode: -1 }).exec();
        
        const lastCode = lastSubject ? lastSubject.subjectCode : 'SUB-000'; 
        const lastNumber = parseInt(lastCode.split('-')[2], 10) || 0;
        
        res.status(200).json({ lastNumber });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du dernier code de sujet', error: error.message || 'Erreur inconnue' });
    }
};

// Crée un nouveau sujet
exports.createSubject = async (req, res) => {
    try {
        const lastSubject = await SubjectModel.findOne().sort({ subjectCode: -1 }).exec();
        const lastCode = lastSubject ? lastSubject.subjectCode : 'SUB-000';
        const lastNumber = parseInt(lastCode.split('-')[2], 10) || 0;
        const newNumber = lastNumber + 1;

        const newCode = `SUB-${newNumber.toString().padStart(3, '0')}`;

        const subject = new SubjectModel({ ...req.body, subjectCode: newCode });
        const savedSubject = await subject.save();
        
        res.status(201).json(savedSubject);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création du sujet', error: error.message || 'Erreur inconnue' });
    }
};

// Récupère tous les sujets
exports.getSubject = async (req, res) => {
    try {
        const subjects = await SubjectModel.find();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des sujets', error: error.message || 'Erreur inconnue' });
    }
};

// Récupère un sujet par ID
exports.getSubjectById = async (req, res) => {
    const subjectId = req.params.id;

    try {
        const subject = await SubjectModel.findById(subjectId);

        if (!subject) {
            return res.status(404).json({ message: 'Sujet non trouvé' });
        }

        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du sujet', error: error.message || 'Erreur inconnue' });
    }
};

// Met à jour un sujet
exports.updateSubject = async (req, res) => {
    const subjectId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedSubject = await SubjectModel.findByIdAndUpdate(subjectId, updatedData, {
            new: true,
            runValidators: true
        });

        if (!updatedSubject) {
            return res.status(404).json({ message: 'Sujet non trouvé' });
        }

        res.status(200).json(updatedSubject);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du sujet', error: error.message || 'Erreur inconnue' });
    }
};

// Supprime un sujet
exports.deleteSubject = async (req, res) => {
    const subjectId = req.params.id;

    try {
        const deletedSubject = await SubjectModel.findByIdAndDelete(subjectId);

        if (!deletedSubject) {
            return res.status(404).json({ message: 'Sujet non trouvé' });
        }

        res.status(200).json({ message: 'Sujet supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du sujet', error: error.message || 'Erreur inconnue' });
    }
};
