// StudentUpdate.jsx
import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


// Définir le schéma de validation avec Yup
const validationSchema = Yup.object({
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

const StudentUpdate = ({ show, handleClose, selectedStudent, updateStudentList }) => {
  const [message, setMessage] = React.useState('');

  // Fonction de soumission du formulaire
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/students/${selectedStudent._id}`, values);
      if (response.status === 200) {
        setMessage('L\'étudiant a été mis à jour avec succès !');
        updateStudentList(response.data); // Appeler la fonction de mise à jour
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        throw new Error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      setMessage('Une erreur est survenue lors de la mise à jour.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Mettre à jour étudiant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && (
          <div className={`alert ${message.includes('succès') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}
        {selectedStudent && (
          <Formik
            initialValues={{
              name: selectedStudent.name || '',
              surname: selectedStudent.surname || '',
              gender: selectedStudent.gender || '',
              dateOfBirth: selectedStudent.dateOfBirth || '',
              identificationNumber: selectedStudent.identificationNumber || '',
              phoneNumber: selectedStudent.phoneNumber || '',
              emailAddress: selectedStudent.emailAddress || '',
              streetAddress: selectedStudent.streetAddress || '',
              country: selectedStudent.country || '',
              zipPostCode: selectedStudent.zipPostCode || '',
              classOptionId: selectedStudent.classOptionId || '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Row>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Prénom</label>
                      <Field name="name" type="text" className="form-control" />
                      <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Nom</label>
                      <Field name="surname" type="text" className="form-control" />
                      <ErrorMessage name="surname" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Sexe</label>
                      <Field name="gender" type="text" className="form-control" />
                      <ErrorMessage name="gender" component="div" className="text-danger" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Date de Naissance</label>
                      <Field name="dateOfBirth" type="date" className="form-control" />
                      <ErrorMessage name="dateOfBirth" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Numéro d'Identification</label>
                      <Field name="identificationNumber" type="text" className="form-control" />
                      <ErrorMessage name="identificationNumber" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Téléphone</label>
                      <Field name="phoneNumber" type="text" className="form-control" />
                      <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Email</label>
                      <Field name="emailAddress" type="email" className="form-control" />
                      <ErrorMessage name="emailAddress" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Adresse</label>
                      <Field name="streetAddress" type="text" className="form-control" />
                      <ErrorMessage name="streetAddress" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Code Postal</label>
                      <Field name="zipPostCode" type="text" className="form-control" />
                      <ErrorMessage name="zipPostCode" component="div" className="text-danger" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Pays</label>
                      <Field name="country" type="text" className="form-control" />
                      <ErrorMessage name="country" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Classe</label>
                      <Field name="classOptionId" type="text" className="form-control" />
                      <ErrorMessage name="classOptionId" component="div" className="text-danger" />
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

export default StudentUpdate;
