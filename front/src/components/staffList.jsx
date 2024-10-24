import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import StaffUpdate from '../components/staffUpdate';
import { Modal, Button } from 'react-bootstrap';

const StaffList = () => {
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/staffs')
      .then(response => setStaffs(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/staffs/${id}`)
      .then(() => {
        setStaffs(staffs.filter(staff => staff._id !== id));
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
    setSelectedStaff(staff);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedStaff(null);
    setShowModal(false);
  };

  const updateStaffList = (updatedStaff) => {
    setStaffs(staffs.map(staff => (staff._id === updatedStaff._id ? updatedStaff : staff)));
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
    { name: 'Prénom', selector: row => row.firstName, sortable: true, width: '15%' },
    { name: 'Nom', selector: row => row.lastName, sortable: true, width: '15%' },
    { name: 'Date de Naissance', selector: row => row.dateOfBirth, sortable: true, width: '20%' },
    { name: 'Email', selector: row => row.email, sortable: true, width: '25%' },
    { name: 'Pays', selector: row => row.country, sortable: true, width: '15%' },
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
        data={staffs}
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
      {selectedStaff && (
        <StaffUpdate
          show={showModal}
          handleClose={handleCloseModal}
          selectedStaff={selectedStaff}
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

export default StaffList;
