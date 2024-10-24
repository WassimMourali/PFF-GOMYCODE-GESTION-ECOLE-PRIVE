const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const classRoutes = require('./routes/classRoutes');
const professorRoutes = require('./routes/professorRoutes');
const staffRoutes = require('./routes/staffRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const reportRoutes = require('./routes/reportRoutes');
const affectationRoutes = require('./routes/affectationRoutes');
const emploiRoutes = require('./routes/emploiRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/professors', professorRoutes);
app.use('/api/staffs', staffRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/affectations', affectationRoutes);
app.use('/api/emplois', emploiRoutes)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
