import React from 'react';
import { Formik, Field, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Box, Typography, Modal, Grid } from '@mui/material';

// Fonction pour générer le code du sujet
const generateSubjectCode = (subjectName, subjectClassf, counter) => {
  // Création d'un code à partir du nom du sujet, sous-matière et numéro de compteur
  const baseCode = `${subjectName.slice(0, 3).toUpperCase()}-${subjectClassf.slice(0, 3).toUpperCase()}-${counter.toString().padStart(3, '0')}`;
  return baseCode;
};

// Validation du formulaire
const validationSchema = Yup.object().shape({
  subjectName: Yup.string().required('Le nom du sujet est requis'),
  subjectClassf: Yup.string().required('Le sous matière du sujet est requis'),
  subjectCode: Yup.string().required('Le code du sujet est requis'),
  creditHours: Yup.number()
    .required('Le nombre d\'heures est requis')
    .min(1, 'Le nombre d\'heures doit être au moins 1')
    .max(40, 'Le nombre d\'heures ne peut pas dépasser 40')
    .typeError('Le nombre d\'heures doit être un nombre valide'),
});

// Composant pour mettre à jour le code du sujet automatiquement
const AutoGenerateSubjectCode = () => {
  const { values, setFieldValue } = useFormikContext();
  const [counter, setCounter] = React.useState(0);
  
  React.useEffect(() => {
    // Récupérer le dernier numéro de compteur lors du chargement
    fetch('http://localhost:5000/api/subjects/last-subject-code')
      .then(response => response.json())
      .then(data => {
        setCounter(data.lastNumber + 1); // Incrémenter le compteur
      })
      .catch(error => console.error('Erreur lors de la récupération du compteur:', error));
  }, []);

  React.useEffect(() => {
    if (values.subjectName && values.subjectClassf) {
      const newCode = generateSubjectCode(values.subjectName, values.subjectClassf, counter);
      setFieldValue('subjectCode', newCode);
    }
  }, [values.subjectName, values.subjectClassf, counter, setFieldValue]);

  return null;
};

const SubjectForm = ({ onSubmit, initialValues }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="sm" sx={{ padding: 0, margin: 0 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          setMessage('');

          fetch('http://localhost:5000/api/subjects', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Erreur lors de la création de la matière');
              }
              return response.json();
            })
            .then((data) => {
              setMessage('Matière créée avec succès !');
              setOpen(true);
              resetForm();
              console.log('Réponse de l\'API:', data);
            })
            .catch((error) => {
              setMessage(error.message);
              setOpen(true);
              console.error('Erreur:', error);
            })
            .finally(() => {
              setSubmitting(false);
              onSubmit(); // Appel de la fonction de soumission passée en props
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <AutoGenerateSubjectCode />
            <Grid container spacing={2} sx={{ margin: 0 }}>
              <Grid item xs={12} sm={6} sx={{ padding: 0 }}>
                <Field name="subjectName">
                  {({ field, meta }) => (
                    <TextField
                      label="Nom du sujet"
                      variant="outlined"
                      autoComplete="off"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                      sx={{ margin: 0 }}
                    />
                  )}
                </Field>
              </Grid>

              <Grid item xs={12} sm={6} sx={{ padding: 0 }}>
                <Field name="subjectClassf">
                  {({ field, meta }) => (
                    <TextField
                      label="Sous Matière"
                      variant="outlined"
                      autoComplete="off"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                      sx={{ margin: 0 }}
                    />
                  )}
                </Field>
              </Grid>

              <Grid item xs={12} sm={6} sx={{ padding: 0 }}>
                <Field name="subjectCode">
                  {({ field, meta }) => (
                    <TextField
                      label="Code du sujet"
                      variant="outlined"
                      autoComplete="off"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                      sx={{ margin: 0 }}
                      disabled
                    />
                  )}
                </Field>
              </Grid>

              <Grid item xs={12} sm={6} sx={{ padding: 0 }}>
                <Field name="creditHours">
                  {({ field, meta }) => (
                    <TextField
                      label="Nombre d'heures"
                      variant="outlined"
                      fullWidth
                      type="number"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                      sx={{ margin: 0 }}
                    />
                  )}
                </Field>
              </Grid>

              <Grid item xs={12} sm={6} sx={{ padding: 0 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'En cours...' : 'Créer'}
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

export default SubjectForm;
