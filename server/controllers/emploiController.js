const Emploi = require('../models/Emploi');

// POST: Create new schedule
const createEmploi = async (req, res) => {
  const { class: classLevel, professor, subject, hoursPerWeek, day, time, roomNumber } = req.body;

  try {
    const newEmploi = new Emploi({
      class: classLevel,
      professor,
      subject,
      hoursPerWeek,
      day,
      time,
      roomNumber,
    });

    await newEmploi.save();
    res.status(201).json(newEmploi);
  } catch (error) {
    res.status(400).json({ message: 'Error creating schedule', error });
  }
};

module.exports = { createEmploi };

// emploiController.js

// Fetch all schedules
const getAllEmplois = async (req, res) => {
    try {
      const emplois = await Emploi.find();  // Retrieve all emplois from the database
      res.status(200).json(emplois);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching schedules', error });
    }
  };
  
  module.exports = { createEmploi, getAllEmplois };
  