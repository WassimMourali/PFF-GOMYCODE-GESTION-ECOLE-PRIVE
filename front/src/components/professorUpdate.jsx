import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Schéma de validation des champs du formulaire
const validationSchema = Yup.object({
  firstName: Yup.string().required('Le prénom est requis'),
  lastName: Yup.string().required('Le nom est requis'),
  dateOfBirth: Yup.date().required('La date de naissance est requise'),
  identificationNumber: Yup.string().required('Le numéro d\'identification est requis'),
  photo: Yup.string().required('URL photo est requis'),
  mobilePhone: Yup.string().required('Le téléphone mobile est requis'),
  landlinePhone: Yup.string().required('Le téléphone fixe est requis'),
  email: Yup.string().email('Email invalide').required('L\'email est requis'),
  addressStreet: Yup.string().required('L\'adresse est requise'),
  country: Yup.string().required('Le pays est requis'),
  postalCode: Yup.string().required('Le code postal est requis'),
  generalNotes: Yup.string().required('Les notes sont requises'),
});

// Composant pour la mise à jour des informations du professeur
const ProfessorUpdate = ({ show, handleClose, selectedProfessor, updateProfessorList }) => {
  const [message, setMessage] = React.useState('');

  const handleSubmit = (values, { setSubmitting }) => {
    axios.put(`http://localhost:5000/api/professors/${selectedProfessor._id}`, values)
      .then(response => {
        setMessage('Le personnel a été mis à jour avec succès !');
        updateProfessorList(response.data);
        setSubmitting(false);
        setTimeout(() => {
          handleClose();
        }, 2000);
      })
      .catch(error => {
        setMessage('Une erreur est survenue lors de la mise à jour.');
        setSubmitting(false);
      });
  };

  // Valeurs initiales du formulaire basées sur les données du professeur sélectionné
  const initialValues = selectedProfessor ? {
    firstName: selectedProfessor.firstName || '',
    lastName: selectedProfessor.lastName || '',
    dateOfBirth: selectedProfessor.dateOfBirth || '',
    identificationNumber: selectedProfessor.identificationNumber || '',
    photo: selectedProfessor.photo || '',
    mobilePhone: selectedProfessor.mobilePhone || '',
    landlinePhone: selectedProfessor.landlinePhone || '',
    email: selectedProfessor.email || '',
    addressStreet: selectedProfessor.addressStreet || '',
    country: selectedProfessor.country || '',
    postalCode: selectedProfessor.postalCode || '',
    generalNotes: selectedProfessor.generalNotes || '',
  } : {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    identificationNumber: '',
    photo: '',
    mobilePhone: '',
    landlinePhone: '',
    email: '',
    addressStreet: '',
    country: '',
    postalCode: '',
    generalNotes: '',
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Mettre à jour le personnel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && (
          <div className={`alert ${message.includes('succès') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}
        {selectedProfessor && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Row>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Prénom</label>
                      <Field name="firstName" type="text" className="form-control" />
                      <ErrorMessage name="firstName" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Nom</label>
                      <Field name="lastName" type="text" className="form-control" />
                      <ErrorMessage name="lastName" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Date de Naissance</label>
                      <Field name="dateOfBirth" type="date" className="form-control" />
                      <ErrorMessage name="dateOfBirth" component="div" className="text-danger" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Numéro d'Identification</label>
                      <Field name="identificationNumber" type="text" className="form-control" />
                      <ErrorMessage name="identificationNumber" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Téléphone Mobile</label>
                      <Field name="mobilePhone" type="text" className="form-control" />
                      <ErrorMessage name="mobilePhone" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Email</label>
                      <Field name="email" type="email" className="form-control" />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Adresse</label>
                      <Field name="addressStreet" type="text" className="form-control" />
                      <ErrorMessage name="addressStreet" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Pays</label>
                      <Field name="country" type="text" className="form-control" />
                      <ErrorMessage name="country" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Code Postal</label>
                      <Field name="postalCode" type="text" className="form-control" />
                      <ErrorMessage name="postalCode" component="div" className="text-danger" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Notes Générales</label>
                      <Field name="generalNotes" type="text" className="form-control" />
                      <ErrorMessage name="generalNotes" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Téléphone Fixe</label>
                      <Field name="landlinePhone" type="text" className="form-control" />
                      <ErrorMessage name="landlinePhone" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>URL Photo</label>
                      <Field name="photo" type="text" className="form-control" />
                      <ErrorMessage name="photo" component="div" className="text-danger" />
                    </div>
                  </Col>
                </Row>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Mettre à jour
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfessorUpdate;
