// routes/affectationRoutes.js
const express = require('express');
const router = express.Router();
const affectationController = require('../controllers/affectationController');

// Route pour créer une nouvelle affectation
router.post('/', affectationController.createAffectation);

// Route pour récupérer toutes les affectations
router.get('/', affectationController.getAllAffectations);

// Route pour récupérer une affectation par ID
router.get('/:id', affectationController.getAffectationById);

// Route pour supprimer une affectation
router.delete('/:id', affectationController.deleteAffectation);

module.exports = router;
