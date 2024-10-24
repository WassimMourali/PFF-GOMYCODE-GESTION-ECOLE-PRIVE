// pages/People.jsx

import React, { useState } from 'react';
import StudentForm from '../components/StudentForm';

const People = () => {
  const [ setStudents] = useState([]);



  const handleAddStudent = (newStudent) => {
    setStudents(prevStudents => [...prevStudents, newStudent]);
  };

  return (
    <div className='flex'>
      <StudentForm onAddStudent={handleAddStudent} />
      
    </div>
  );
};

export default People;
