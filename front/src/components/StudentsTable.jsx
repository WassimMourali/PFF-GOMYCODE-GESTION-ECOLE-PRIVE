import React from 'react';
import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const StudentsTable = ({ students }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h3 style={{ padding: '10px' }}>Liste des Élèves</h3>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderBottom: '2px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Nom</TableCell>
            <TableCell sx={{ borderBottom: '2px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Prénom</TableCell>
            <TableCell sx={{ borderBottom: '2px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Email</TableCell>
            <TableCell sx={{ borderBottom: '2px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Téléphone</TableCell>
            <TableCell sx={{ borderBottom: '2px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Classe</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <motion.TableRow key={student._id} hover whileHover={{ scale: 1.03 }}>
              <TableCell sx={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>{student.surname}</TableCell>
              <TableCell sx={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>{student.name}</TableCell>
              <TableCell sx={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>{student.email}</TableCell>
              <TableCell sx={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>{student.phone}</TableCell>
              <TableCell sx={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>{student.studentClassRef}</TableCell>
            </motion.TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentsTable;
