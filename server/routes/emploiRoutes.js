const express = require('express');
const { createEmploi, getAllEmplois } = require('../controllers/emploiController');
const router = express.Router();

// POST /api/emplois
router.post('/', createEmploi);

router.get('/', getAllEmplois);

module.exports = router;
