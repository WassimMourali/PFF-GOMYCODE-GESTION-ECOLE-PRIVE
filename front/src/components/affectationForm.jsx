import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import {
  Button, Container, Box, Typography, Modal, Grid,
  MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify'; // Importer toast et ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importer les styles de react-toastify

const validationSchema = Yup.object().shape({
  classId: Yup.string().required('La classe est requise'),
  teacherId: Yup.string().required('L\'enseignant est requis'),
  subjectId: Yup.string().required('La matière est requise'),
  studentId: Yup.string().required('L\'étudiant est requis'),
});

const AffectationForm = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => setOpen(false);

  // Fetching data from API for classes, teachers, subjects, students
  useEffect(() => {
    fetch('http://localhost:5000/api/classes')
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => toast.error('Erreur lors de la récupération des classes'));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/professors')
      .then((response) => response.json())
      .then((data) => setTeachers(data))
      .catch((error) => toast.error('Erreur lors de la récupération des enseignants'));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/subjects')
      .then((response) => response.json())
      .then((data) => setSubjects(data))
      .catch((error) => toast.error('Erreur lors de la récupération des matières'));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => toast.error('Erreur lors de la récupération des étudiants'));
  }, []);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setOpen(false);
    setMessage('');

    fetch('http://localhost:5000/api/affectations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de l\'affectation');
        }
        return response.json();
      })
      .then((data) => {
        setMessage('Affectation créée avec succès !');
        toast.success('Affectation créée avec succès !'); // Afficher une notification de succès
        resetForm();
      })
      .catch((error) => {
        setMessage(error.message);
        toast.error(`Erreur : ${error.message}`); // Afficher une notification d'erreur
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Container>
      <ToastContainer /> {/* Conteneur pour les notifications */}

      <Formik
        initialValues={{
          classId: '',
          teacherId: '',
          subjectId: '',
          studentId: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>
              {/* Form fields for selecting class, teacher, subject, student */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="class-label">Classe</InputLabel>
                  <Field
                    name="classId"
                    as={Select}
                    labelId="class-label"
                    label="Classe"
                    fullWidth
                  >
                    {classes.map((classItem) => (
                      <MenuItem key={classItem._id} value={classItem._id}>
                        {classItem.classRef} - {classItem.classLevel}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="teacher-label">Enseignant</InputLabel>
                  <Field
                    name="teacherId"
                    as={Select}
                    labelId="teacher-label"
                    label="Enseignant"
                    fullWidth
                  >
                    {teachers.map((teacher) => (
                      <MenuItem key={teacher._id} value={teacher._id}>
                        {teacher.firstName}-{teacher.lastName}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="subject-label">Matière</InputLabel>
                  <Field
                    name="subjectId"
                    as={Select}
                    labelId="subject-label"
                    label="Matière"
                    fullWidth
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject._id} value={subject._id}>
                        {subject.subjectClassf}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="student-label">Étudiant</InputLabel>
                  <Field
                    name="studentId"
                    as={Select}
                    labelId="student-label"
                    label="Étudiant"
                    fullWidth
                  >
                    {students.map((student) => (
                      <MenuItem key={student._id} value={student._id}>
                        {student.name} {student.surname}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'En cours...' : 'Affecter'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Résultat
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {message}
          </Typography>
          <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
            Fermer
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default AffectationForm;
