const express = require('express');
const axios = require('axios');
const Student = require('../models/Student');
const router = express.Router();

const RAZOR_API_KEY = process.env.RAZOR_API_KEY;
const RAZOR_ENDPOINT = 'https://api.razorreports.com/reports';

router.post('/generate', async (req, res) => {
  try {
    const students = await Student.find();

    const reportData = {
      templateId: 'YOUR_TEMPLATE_ID',
      data: students
    };

    const response = await axios.post(RAZOR_ENDPOINT, reportData, {
      headers: {
        'Authorization': `Bearer ${RAZOR_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      message: 'Rapport généré avec succès',
      reportUrl: response.data.reportUrl
    });
  } catch (error) {
    console.error('Erreur lors de la génération du rapport:', error);
    res.status(500).json({ message: 'Erreur lors de la génération du rapport', error });
  }
});

module.exports = router;
