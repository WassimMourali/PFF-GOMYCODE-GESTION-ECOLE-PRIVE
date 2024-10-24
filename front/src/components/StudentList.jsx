import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import StaffUpdate from '../components/studentUpdate';
import { toast, ToastContainer } from 'react-toastify';  // Importer react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Importer les styles CSS

const StudentList = () => {
  const [students, setstudents] = useState([]);
  const [selectedStudent, setselectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Récupérer les étudiants
  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => setstudents(response.data))
      .catch(error => {
        toast.error('Erreur lors de la récupération des étudiants.');
        console.log(error);
      });
  }, []);

  // Gérer la suppression
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/students/${id}`)
      .then(() => {
        setstudents(students.filter(student => student._id !== id));
        toast.success('L\'étudiant a été supprimé avec succès !');
      })
      .catch(error => {
        console.log(error);
        toast.error('Une erreur est survenue lors de la suppression.');
      });
  };

  // Gérer la mise à jour
  const handleUpdate = (student) => {
    setselectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setselectedStudent(null);
    setShowModal(false);
  };

  const updateStudentList = (updatedStudent) => {
    setstudents(students.map(student => (student._id === updatedStudent._id ? updatedStudent : student)));
    toast.success('Les informations de l\'étudiant ont été mises à jour avec succès.');
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
    { name: 'Prénom', selector: row => row.name, sortable: true, width: '15%' },
    { name: 'Nom', selector: row => row.surname, sortable: true, width: '15%' },
    { name: 'Date de Naissance', selector: row => row.dateOfBirth, sortable: true, width: '20%' },
    { name: 'Email', selector: row => row.emailAddress, sortable: true, width: '25%' },
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
      {/* Intégrer le conteneur de Toast */}
      <ToastContainer />

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

      {selectedStudent && (
        <StaffUpdate
          show={showModal}
          handleClose={handleCloseModal}
          selectedStudent={selectedStudent}
          updateStudentList={updateStudentList}
        />
      )}
    </div>
  );
};

export default StudentList;
