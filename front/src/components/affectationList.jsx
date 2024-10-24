import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import StaffUpdate from '../components/affectationsDetailModal';
import { Modal, Button } from 'react-bootstrap';

const AffectList = () => {
  const [students, setstudents] = useState([]);
  const [selectedStudent, setselectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/affectations')
      .then(response => setstudents(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/students/${id}`)
      .then(() => {
        setstudents(students.filter(staff => staff._id !== id));
        setMessage('Le personnel a été supprimé avec succès !');
        setShowMessageModal(true);
      })
      .catch(error => {
        console.log(error);
        setMessage('Une erreur est survenue lors de la suppression.');
        setShowMessageModal(true);
      });
  };

  const handleUpdate = (staff) => {
    setselectedStudent(staff);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setselectedStudent(null);
    setShowModal(false);
  };

  const updateStaffList = (updatedStaff) => {
    setstudents(students.map(staff => (staff._id === updatedStaff._id ? updatedStaff : staff)));
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
  };

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <div>
      <input
        id="search"
        type="text"
        placeholder="Rechercher..."
        value={filterText}
        onChange={onFilter}
      />
      <IconButton onClick={onClear} aria-label="clear">
        <FilterListIcon />
      </IconButton>
    </div>
  );

  const columns = [
    { name: 'Préno', selector: row => row.teacherId, sortable: true, width: '15%' },
    { name: 'Nom', selector: row => row.classId, sortable: true, width: '15%' },

    {
      name: 'Actions',
      cell: row => (
        <>
          <IconButton onClick={() => handleUpdate(row)} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row._id)} aria-label="delete" style={{ color: 'red' }}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
      width: '10%',
    }
  ];

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <DataTable
        columns={columns}
        data={students}
        pagination
        customStyles={{
          table: {
            style: {
              minWidth: '900px',
            },
          },
          headCells: {
            style: {
              fontSize: '16px',
            },
          },
          cells: {
            style: {
              fontSize: '14px',
            },
          },
        }}
        filterComponent={FilterComponent}
      />
      
      {}
      {selectedStudent && (
        <StaffUpdate
          show={showModal}
          handleClose={handleCloseModal}
          selectedStudent={selectedStudent}
          updateStaffList={updateStaffList}
        />
      )}

      {}
      <Modal show={showMessageModal} onHide={handleCloseMessageModal}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMessageModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AffectList;
