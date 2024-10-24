import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Modal,
  Grid,
} from '@mui/material';

const validationSchema = Yup.object().shape({
  classLevel: Yup.string().required('Le niveau de classe est requis'),
  classRef: Yup.string().required('Référencement de classe est requis'),
  classNumber: Yup.number().required('Nombre d\'élèves est requis').positive().integer(),
  classCapacity: Yup.number().required('Capacité maximale est requise').positive().integer(),
});

const ClassForm = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => setOpen(false);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setOpen(false);
    setMessage('');

    fetch('http://localhost:5000/api/classes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la création de la classe');
        }
        return response.json();
      })
      .then((data) => {
        setMessage('Classe créée avec succès !');
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
      });
  };

  return (
    <Container>
      <Formik
        initialValues={{
          classLevel: '',
          classRef: '',
          classNumber: '25',
          classCapacity: '40',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={4}>
                <Field name="classLevel">
                  {({ field, meta }) => (
                    <TextField
                      label="Niveau de classe"
                      variant="outlined"
                      autoComplete="off"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field name="classRef">
                  {({ field, meta }) => (
                    <TextField
                      label="Référencement de classe"
                      variant="outlined"
                      autoComplete="off"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field name="classNumber">
                  {({ field, meta }) => (
                    <TextField
                      label="Nombre d'élèves"
                      type="number"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field name="classCapacity">
                  {({ field, meta }) => (
                    <TextField
                      label="Capacité de la classe"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={4}>
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

export default ClassForm;
