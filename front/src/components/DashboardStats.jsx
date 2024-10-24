import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const StatCard = ({ title, value }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Card variant="outlined" sx={{ maxWidth: 275, margin: '16px', backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <Typography variant="h5" component="div">{title}</Typography>
        <Typography variant="h4" color="primary">{value}</Typography>
      </CardContent>
    </Card>
  </motion.div>
);

const DashboardStats = ({ totalClasses, totalProfessors, totalSubjects, totalStudents }) => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <StatCard title="Total Classes" value={totalClasses} />
    <StatCard title="Total Professeurs" value={totalProfessors} />
    <StatCard title="Total Matières" value={totalSubjects} />
    <StatCard title="Total Élèves" value={totalStudents} />
  </div>
);

export default DashboardStats;
