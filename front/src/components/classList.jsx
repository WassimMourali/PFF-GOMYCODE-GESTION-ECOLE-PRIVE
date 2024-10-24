import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import ClassUpdate from '../components/staffUpdate';
import { Modal, Button } from 'react-bootstrap';

const ClassList = () => {
  const [Classs, setClasss] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/classes')
      .then(response => setClasss(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/classes/${id}`)
      .then(() => {
        setClasss(Classs.filter(Class => Class._id !== id));
        setMessage('Le personnel a été supprimé avec succès !');
        setShowMessageModal(true);
      })
      .catch(error => {
        console.log(error);
        setMessage('Une erreur est survenue lors de la suppression.');
        setShowMessageModal(true);
      });
  };

  const handleUpdate = (Class) => {
    setSelectedClass(Class);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedClass(null);
    setShowModal(false);
  };

  const updateClassList = (updatedClass) => {
    setClasss(Classs.map(Class => (Class._id === updatedClass._id ? updatedClass : Class)));
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
    { name: 'Référence', selector: row => row.classRef, sortable: true, width: '15%' },
    { name: 'Niveau Années', selector: row => row.classLevel, sortable: true, width: '15%' },
    { name: 'Capacités', selector: row => row.classCapacity, sortable: true, width: '12%' },
    { name: 'Nbr.Occupées', selector: row => row.classNumber, sortable: true, width: '16%' },
    { name: 'ID', selector: row => row._id, sortable: true, width: '25%' },

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
        data={Classs}
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
      {selectedClass && (
        <ClassUpdate
          show={showModal}
          handleClose={handleCloseModal}
          selectedClass={selectedClass}
          updateClassList={updateClassList}
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

export default ClassList;
