import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const MessageModal = ({ show, onHide, type, message }) => {
  const isSuccess = type === 'success';

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isSuccess ? 'Success' : 'Error'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <div className={`mb-3 ${isSuccess ? 'text-success' : 'text-danger'}`}>
          {isSuccess ? <FaCheckCircle size={50} /> : <FaTimesCircle size={50} />}
        </div>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;
