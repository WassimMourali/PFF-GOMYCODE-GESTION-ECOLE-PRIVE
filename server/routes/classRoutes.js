const express = require('express');
const classController = require('../controllers/classController');
const router = express.Router();

router.post('/', classController.createClass);

router.get('/', classController.getAllClasses);

router.get('/:id', classController.getClass);

router.put('/:id', classController.updateClass);

router.delete('/:id', classController.deleteClass);

module.exports = router;
