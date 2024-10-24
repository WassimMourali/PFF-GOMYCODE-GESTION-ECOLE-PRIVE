import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Modal, Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Icône pour les classes avec des places libres
import ErrorIcon from '@mui/icons-material/Error'; // Icône pour les classes sans places libres

// Style pour la modale
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AffectationsTable = () => {
  const [affectations, setAffectations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedClassDetails, setSelectedClassDetails] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les affectations depuis l'API
    const fetchAffectations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/affectations');
        const data = await response.json();

        // Récupérer les détails des étudiants, enseignants, matières pour chaque affectation
        const detailedAffectations = await Promise.all(
          data.map(async (affectation) => {
            const classe = await fetch(`http://localhost:5000/api/classes/${affectation.classId}`).then(res => res.json());
            const student = await fetch(`http://localhost:5000/api/students/${affectation.studentId}`).then(res => res.json());
            const teacher = await fetch(`http://localhost:5000/api/professors/${affectation.teacherId}`).then(res => res.json());
            const subject = await fetch(`http://localhost:5000/api/subjects/${affectation.subjectId}`).then(res => res.json());

            return {
              classId: affectation.classId,
              className: classe.classLevel,
              classCapacity: classe.classCapacity, // Récupération de la capacité de la classe
              student: `${student.name} ${student.surname}`,
              teacher: teacher.firstName,
              subject: subject.subjectClassf,
            };
          })
        );

        setAffectations(detailedAffectations);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des affectations:', error);
        setIsLoading(false);
      }
    };

    fetchAffectations();
  }, []);

  // Fonction pour ouvrir la modale et afficher les détails de la classe
  const handleOpenModal = (classDetails) => {
    setSelectedClassDetails(classDetails);
    setOpenModal(true);
  };

  // Fonction pour fermer la modale
  const handleCloseModal = () => setOpenModal(false);

  if (isLoading) {
    return <CircularProgress />;
  }

  // Regrouper les affectations par classId
  const groupedAffectations = affectations.reduce((acc, curr) => {
    const classGroup = acc[curr.classId] || { className: curr.className, classCapacity: curr.classCapacity, students: [] };
    classGroup.students.push(curr.student);
    acc[curr.classId] = classGroup;
    return acc;
  }, {});

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Classe</TableCell>
              <TableCell>Capacité</TableCell>
              <TableCell>Occupé</TableCell>
              <TableCell>Status</TableCell> {/* Colonne pour l'icône de statut */}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(groupedAffectations).map((classGroup, index) => {
              const studentsCount = classGroup.students.length;
              const freeSpots = classGroup.classCapacity - studentsCount; // Calcul des places disponibles
              const isAvailable = freeSpots > 0; // Vérifier s'il reste des places

              return (
                <React.Fragment key={index}>
                  <TableRow onClick={() => handleOpenModal(classGroup.students)} style={{ cursor: 'pointer', backgroundColor: '#f0f0f0' }}>
                    <TableCell>
                      <strong>{classGroup.className}</strong> (Cliquez pour voir les détails)
                    </TableCell>
                    <TableCell>{classGroup.classCapacity}</TableCell>
                    <TableCell>{studentsCount}</TableCell>
                    <TableCell>
                      {isAvailable ? (
                        <>
                          <CheckCircleIcon style={{ color: 'green' }} /> {/* Icône verte */}
                          <span> {freeSpots} postes libres</span> {/* Afficher le nombre de places libres */}
                        </>
                      ) : (
                        <>
                          <ErrorIcon style={{ color: 'red' }} /> {/* Icône rouge */}
                          <span> Aucun poste libre</span> {/* Afficher aucun poste disponible */}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal pour afficher les détails de la classe */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Détails de la Classe
          </Typography>
          {selectedClassDetails && (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <strong>Étudiants :</strong>
              <ul>
                {selectedClassDetails.map((student, idx) => (
                  <li key={idx}>{student}</li>
                ))}
              </ul>
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AffectationsTable;
