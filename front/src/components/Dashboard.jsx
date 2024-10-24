import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardStats from './DashboardStats';
import ClassesTable from './ClassesTable';
import ProfessorsTable from './ProfessorsTable';
import SubjectsTable from './SubjectsTable';
import StudentsTable from './StudentsTable';

const Dashbord = () => {
  const [classes, setClasses] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  // Fetch data from API on component mount
  useEffect(() => {
    // Fetch classes
    axios.get('http://localhost:5000/api/classes')
      .then((response) => setClasses(response.data))
      .catch((error) => console.error('Erreur lors du chargement des classes:', error));

    // Fetch professors
    axios.get('http://localhost:5000/api/professors')
      .then((response) => setProfessors(response.data))
      .catch((error) => console.error('Erreur lors du chargement des professeurs:', error));

    // Fetch subjects
    axios.get('http://localhost:5000/api/subjects')
      .then((response) => setSubjects(response.data))
      .catch((error) => console.error('Erreur lors du chargement des matières:', error));

    // Fetch students
    axios.get('http://localhost:5000/api/students')
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Erreur lors du chargement des élèves:', error));
  }, []);

  return (
    <div>
      {/* Section des statistiques */}
      <DashboardStats
        totalClasses={classes.length}
        totalProfessors={professors.length}
        totalSubjects={subjects.length}
        totalStudents={students.length}
      />

      {/* Section des tables */}
      <div className="tables-section">
        <ClassesTable classes={classes} />
        <ProfessorsTable professors={professors} />
        <SubjectsTable subjects={subjects} />
        <StudentsTable students={students} />
      </div>
    </div>
  );
};

export default Dashbord;
