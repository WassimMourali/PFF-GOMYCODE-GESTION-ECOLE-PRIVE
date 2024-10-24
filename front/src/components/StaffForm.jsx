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
  indetificationNumber: Yup.string().required('Le numéro d\'identification est requis'),
  mobilePhone: Yup.string().required('Le téléphone mobile est requis'),
  email: Yup.string().email('Email invalide').required('L\'email est requis'),
  adresse: Yup.string().required('L\'adresse est requise'),
  country: Yup.string().required('Le pays est requis')
});

const StaffForm = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => setOpen(false);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setOpen(false);
    setMessage('');

    fetch('http://localhost:5000/api/staffs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la création du membre du personnel');
        }
        return response.json();
      })
      .then((data) => {
        setMessage('Membre du personnel créé avec succès !');
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
    <Container > {}
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          indetificationNumber: '',
          photoStf:'',
          mobilePhone: '',
          email: '',
          adresse: '',
          country: 'Tunisie'
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>

              <Grid item xs={12} sm={4}> {}
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

              <Grid item xs={12} sm={4}> {}
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

              <Grid item xs={12} sm={4}> {}
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

              <Grid item xs={12} sm={4}>
                <Field name="indetificationNumber">
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

              <Grid item xs={12} sm={4}>
                <Field name="adresse">
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

              <Grid item xs={12} sm={4}> {}
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

      {}
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

export default StaffForm;
