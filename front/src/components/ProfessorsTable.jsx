import React from 'react';
import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const ProfessorsTable = ({ professors }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h3 style={{ padding: '10px' }}>Liste des Professeurs</h3>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderBottom: '2px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Nom</TableCell>
            <TableCell sx={{ borderBottom: '2px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Prénom</TableCell>
            <TableCell sx={{ borderBottom: '2px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Email</TableCell>
            <TableCell sx={{ borderBottom: '2px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Téléphone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {professors.map((professor) => (
            <motion.TableRow key={professor._id} hover whileHover={{ scale: 1.03 }}>
              <TableCell sx={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>{professor.lastName}</TableCell>
              <TableCell sx={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>{professor.firstName}</TableCell>
              <TableCell sx={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>{professor.email}</TableCell>
              <TableCell sx={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>{professor.mobilePhone}</TableCell>
            </motion.TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProfessorsTable;
