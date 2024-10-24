import React from 'react';
import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const SubjectsTable = ({ subjects }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h3 style={{ padding: '10px' }}>Liste des Matières</h3>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderBottom: '2px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Code</TableCell>
            <TableCell sx={{ borderBottom: '2px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Nom</TableCell>
            <TableCell sx={{ borderBottom: '2px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Heures Crédits</TableCell>
            <TableCell sx={{ borderBottom: '2px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Classification</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject) => (
            <motion.TableRow key={subject._id} hover whileHover={{ scale: 1.03 }}>
              <TableCell sx={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>{subject.subjectCode}</TableCell>
              <TableCell sx={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>{subject.subjectName}</TableCell>
              <TableCell sx={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>{subject.creditHours}</TableCell>
              <TableCell sx={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>{subject.subjectClassf}</TableCell>
            </motion.TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubjectsTable;
