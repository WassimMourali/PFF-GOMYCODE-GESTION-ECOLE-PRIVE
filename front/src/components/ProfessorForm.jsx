import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  MenuItem,
  Container,
  Box,
  Typography,
  Modal,
  Grid,
} from '@mui/material';

const countryList = [
  'Algérie', 'Angola', 'Bénin', 'Botswana', 'Burkina Faso', 'Burundi',
  'Cameroun', 'Cap-Vert', 'République centrafricaine', 'Tchad', 'Comores',
  'République du Congo', 'République démocratique du Congo', 'Djibouti', 'Égypte',
  'Guinée équatoriale', 'Érythrée', 'Eswatini', 'Éthiopie', 'Gabon', 'Gambie',
  'Ghana', 'Guinée', 'Guinée-Bissau', 'Côte d\'Ivoire', 'Kenya', 'Lesotho',
  'Libéria', 'Libye', 'Madagascar', 'Malawi', 'Mali', 'Mauritanie', 'Maurice',
  'Maroc', 'Mozambique', 'Namibie', 'Niger', 'Nigeria', 'Rwanda', 'Sao Tomé-et-Principe',
  'Sénégal', 'Seychelles', 'Sierra Leone', 'Somalie', 'Afrique du Sud', 'Soudan',
  'Soudan du Sud', 'Tanzanie', 'Togo', 'Tunisie', 'Ouganda', 'Zambie', 'Zimbabwe'
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Le prénom est requis'),
  lastName: Yup.string().required('Le nom est requis'),
  dateOfBirth: Yup.date().required('La date de naissance est requise'),
  identificationNumber: Yup.string().required('Le numéro d\'identification est requis'),
  photo: Yup.string().url('URL invalide').required('L\'URL de la photo est requise'),
  mobilePhone: Yup.string().required('Le téléphone mobile est requis'),
  landlinePhone: Yup.string().required('Le téléphone fixe est requis'),
  email: Yup.string().email('Email invalide').required('L\'email est requis'),
  addressStreet: Yup.string().required('L\'adresse est requise'),
  country: Yup.string().required('Le pays est requis'),
  postalCode: Yup.string().required('Le code postal est requis'),
  generalNotes: Yup.string().required('Les notes générales sont requises')
});

const ProfessorForm = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => setOpen(false);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setMessage('');

    fetch('http://localhost:5000/api/professors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la création du professeur');
        }
        return response.json();
      })
      .then((data) => {
        setMessage('Professeur créé avec succès !');
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
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          identificationNumber: '',
          photo: '',
          mobilePhone: '',
          landlinePhone: '',
          email: '',
          addressStreet: '',
          country: 'Tunisie',
          postalCode: '',
          generalNotes: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>

              {}
              <Grid item xs={12} sm={4}>
                <Field name="firstName">
                  {({ field, meta }) => (
                    <TextField
                      label="Prénom"
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

              {}
              <Grid item xs={12} sm={4}>
                <Field name="lastName">
                  {({ field, meta }) => (
                    <TextField
                      label="Nom"
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

              {}
              <Grid item xs={12} sm={4}>
                <Field name="dateOfBirth">
                  {({ field, meta }) => (
                    <TextField
                      label="Date de naissance"
                      type="date"
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

              {}
              <Grid item xs={12} sm={4}>
                <Field name="identificationNumber">
                  {({ field, meta }) => (
                    <TextField
                      label="Numéro d'identification"
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

              {}
              <Grid item xs={12} sm={4}>
                <Field name="photo">
                  {({ field, meta }) => (
                    <TextField
                      label="URL Photo"
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

              {}
              <Grid item xs={12} sm={4}>
                <Field name="mobilePhone">
                  {({ field, meta }) => (
                    <TextField
                      label="Téléphone mobile"
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

              {}
              <Grid item xs={12} sm={4}>
                <Field name="landlinePhone">
                  {({ field, meta }) => (
                    <TextField
                      label="Téléphone fixe"
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

              {}
              <Grid item xs={12} sm={4}>
                <Field name="email">
                  {({ field, meta }) => (
                    <TextField
                      label="Email"
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

              {}
              <Grid item xs={12} sm={4}>
                <Field name="addressStreet">
                  {({ field, meta }) => (
                    <TextField
                      label="Adresse"
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

              {}
              <Grid item xs={12} sm={4}>
                <Field name="country">
                  {({ field }) => (
                    <TextField
                      select
                      label="Pays"
                      variant="outlined"
                      fullWidth
                      {...field}
                    >
                      {countryList.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Field>
              </Grid>

              {}
              <Grid item xs={12} sm={4}>
                <Field name="postalCode">
                  {({ field, meta }) => (
                    <TextField
                      label="Code postal"
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

              {}
              <Grid item xs={12} sm={12}>
                <Field name="generalNotes">
                  {({ field, meta }) => (
                    <TextField
                      label="Notes générales"
                      variant="outlined"
                      autoComplete="off"
                      fullWidth
                      multiline
                      rows={4}
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>

              {}
              <Grid item xs={12} sm={12}>
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Soumettre'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      {}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          p: 4, 
          boxShadow: 24, 
          borderRadius: 2
        }}>
          <Typography variant="h6" textAlign="center">
            {message}
          </Typography>
          <Box textAlign="center" mt={2}>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Fermer
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProfessorForm;
