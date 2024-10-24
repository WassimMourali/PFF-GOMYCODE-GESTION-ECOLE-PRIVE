import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Le prénom est requis'),
  lastName: Yup.string().required('Le nom est requis'),
  dateOfBirth: Yup.date().required('La date de naissance est requise'),
  indetificationNumber: Yup.string().required('Le numéro d\'identification est requis'),
  mobilePhone: Yup.string().required('Le téléphone mobile est requis'),
  email: Yup.string().email('Email invalide').required('L\'email est requis'),
  adresse: Yup.string().required('L\'adresse est requise'),
  country: Yup.string().required('Le pays est requis'),
});

const StaffUpdate = ({ show, handleClose, selectedStaff, updateStaffList }) => {
  const [message, setMessage] = React.useState('');

  const handleSubmit = (values, { setSubmitting }) => {
    axios.put(`http://localhost:5000/api/staffs/${selectedStaff._id}`, values)
      .then(response => {
        setMessage('Le personnel a été mis à jour avec succès !');
        updateStaffList(response.data);
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

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Mettre à jour le personnel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <div className={`alert ${message.includes('succès') ? 'alert-success' : 'alert-danger'}`} role="alert">{message}</div>}
        {selectedStaff && (
          <Formik
            initialValues={{
              firstName: selectedStaff.firstName,
              lastName: selectedStaff.lastName,
              dateOfBirth: selectedStaff.dateOfBirth,
              indetificationNumber: selectedStaff.indetificationNumber,
              mobilePhone: selectedStaff.mobilePhone,
              email: selectedStaff.email,
              adresse: selectedStaff.adresse,
              country: selectedStaff.country,
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
                      <Field name="indetificationNumber" type="text" className="form-control" />
                      <ErrorMessage name="indetificationNumber" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Téléphone</label>
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
                      <Field name="adresse" type="text" className="form-control" />
                      <ErrorMessage name="adresse" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="form-group">
                      <label>Pays</label>
                      <Field name="country" type="text" className="form-control" />
                      <ErrorMessage name="country" component="div" className="text-danger" />
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

export default StaffUpdate;
