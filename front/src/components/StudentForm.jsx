import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  MenuItem,
  Container,
  Modal,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import axios from 'axios';

// Liste des pays
const countryList = [{ name: 'Tunisie' }];

// Schéma de validation avec Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Le prénom est requis'),
  surname: Yup.string().required('Le nom est requis'),
  gender: Yup.string().required('Le sexe est requis'),
  dateOfBirth: Yup.date().required('La date de naissance est requise'),
  identificationNumber: Yup.string(),
  phoneNumber: Yup.string().required('Le téléphone est requis'),
  emailAddress: Yup.string().email('Email invalide').required('L\'email est requis'),
  streetAddress: Yup.string().required('L\'adresse est requise'),
  country: Yup.string().required('Le pays est requis'),
  zipPostCode: Yup.string().required('Le code postal est requis'),
  classOptionId: Yup.string().required('La classe est requise'),
});

const StudentForm = () => {
  const [classOptions, setClassOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => setOpen(false);

  // Récupérer les options de classe depuis l'API
  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/classes');
        setClassOptions(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des options de classe', error);
      }
    };
    fetchClassOptions();
  }, []);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setMessage('');

    try {
      await axios.post('http://localhost:5000/api/students', values);
      // Affiche le message de succès
      setMessage('Membre de l\'étudiant créé avec succès !');
      resetForm();
    } catch (error) {
      // Affiche le message d'erreur
      setMessage('Erreur lors de la création de l\'étudiant : ' + (error.response ? error.response.data.message : error.message));
    } finally {
      setOpen(true);
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Ajouter un étudiant
      </Typography>
      <Formik
        initialValues={{
          name: '',
          surname: '',
          gender: '',
          dateOfBirth: '',
          identificationNumber: '',
          phoneNumber: '',
          emailAddress: '',
          streetAddress: '',
          country: '',
          zipPostCode: '',
          generalNote: '',
          medicalNotes: '',
          classOptionId: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              {/* Prénom */}
              <Grid item xs={12} sm={6}>
                <Field name="name">
                  {({ field, meta }) => (
                    <TextField
                      size="small"
                      label="Prénom"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>

              {/* Nom */}
              <Grid item xs={12} sm={6}>
                <Field name="surname">
                  {({ field, meta }) => (
                    <TextField
                      size="small"
                      label="Nom"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>

              {/* Sexe */}
              <Grid item xs={12} sm={6}>
                <Field name="gender">
                  {({ field, meta }) => (
                    <TextField
                      select
                      size="small"
                      label="Sexe"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    >
                      <MenuItem value="">Sélectionner le sexe</MenuItem>
                      <MenuItem value="Male">Homme</MenuItem>
                      <MenuItem value="Female">Femme</MenuItem>
                    </TextField>
                  )}
                </Field>
              </Grid>

              {/* Date de naissance */}
              <Grid item xs={12} sm={6}>
                <Field name="dateOfBirth">
                  {({ field, meta }) => (
                    <TextField
                      size="small"
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

              {/* Numéro d'identification */}
              <Grid item xs={12} sm={6}>
                <Field name="identificationNumber">
                  {({ field, meta }) => (
                    <TextField
                      size="small"
                      label="Numéro d'identification"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>

              {/* Téléphone */}
              <Grid item xs={12} sm={6}>
                <Field name="phoneNumber">
                  {({ field, meta }) => (
                    <TextField
                      size="small"
                      label="Téléphone"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6}>
                <Field name="emailAddress">
                  {({ field, meta }) => (
                    <TextField
                      size="small"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>

              {/* Adresse */}
              <Grid item xs={12} sm={6}>
                <Field name="streetAddress">
                  {({ field, meta }) => (
                    <TextField
                      size="small"
                      label="Adresse"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>

              {/* Pays */}
              <Grid item xs={12} sm={6}>
                <Field name="country">
                  {({ field, meta }) => (
                    <TextField
                      select
                      size="small"
                      label="Pays"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    >
                      <MenuItem value="">Sélectionner un pays</MenuItem>
                      {countryList.map((country) => (
                        <MenuItem key={country.name} value={country.name}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Field>
              </Grid>

              {/* Code postal */}
              <Grid item xs={12} sm={6}>
                <Field name="zipPostCode">
                  {({ field, meta }) => (
                    <TextField
                      size="small"
                      label="Code postal"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>

              {/* Notes générales */}
              <Grid item xs={12}>
                <Field name="generalNote">
                  {({ field, meta }) => (
                    <TextField
                      label="Notes générales"
                      variant="outlined"
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

              {/* Notes médicales */}
              <Grid item xs={12}>
                <Field name="medicalNotes">
                  {({ field, meta }) => (
                    <TextField
                      label="Notes médicales"
                      variant="outlined"
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

              {/* Classe */}
              <Grid item xs={12}>
                <Field name="classOptionId">
                  {({ field, meta }) => (
                    <TextField
                      select
                      size="small"
                      label="Classe"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    >
                      <MenuItem value="">Sélectionner une classe</MenuItem>
                      {classOptions.map((classOption) => (
                        <MenuItem key={classOption._id} value={classOption._id}>
                          {classOption.classLevel} {/* Remplacement effectué ici */}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Field>
              </Grid>
            </Grid>

            {/* Bouton de soumission */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ marginTop: 2 }}
            >
              {isSubmitting ? 'Enregistrement...' : 'Créer l\'étudiant'}
            </Button>
          </Form>
        )}
      </Formik>

      {/* Modal d'information */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            {message}
          </Typography>
          <Button variant="outlined" onClick={handleClose}>
            Fermer
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default StudentForm;
