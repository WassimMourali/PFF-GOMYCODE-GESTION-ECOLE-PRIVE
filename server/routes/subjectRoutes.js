const express = require('express');
const router = express.Router();
const SubjectController = require('../controllers/subjectController');

router.post('/',SubjectController.createSubject);
router.get('/', SubjectController.getSubject)
router.get('/:id', SubjectController.getSubjectById)
router.put('/:id', SubjectController.updateSubject)
router.delete('/:id', SubjectController.deleteSubject)

module.exports = router;