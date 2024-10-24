import React, { useState } from 'react';
import StaffList from '../components/StudentList';
import StaffForm from '../components/StudentForm';

const StudentPage = () => {
  const [selectedStudent, setselectedStudent] = useState(null);

  const handleFormSubmit = () => {
    setselectedStudent(null);
  };

  return (
    <div  className='flex w-[1500px]'>
      {}

      <div style={{ padding: '20px' }}>
        {}
        <StaffForm
          onSubmit={handleFormSubmit}
          initialValues={selectedStudent ? selectedStudent : undefined}
        />

        {}
        <h3>Liste Students</h3>
        <StaffList setselectedStudent={setselectedStudent} /> {}
      </div>
    </div>
  );
};

export default StudentPage;
