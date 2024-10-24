import React, { useState } from 'react';
import SubjectForm from '../components/SubjectForm';

const StaffPage = () => {
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleFormSubmit = () => {
    setSelectedStaff(null);
  };

  return (
    <div style={{ padding: '20px' }} className='flex w-[1500px]'>
      <SubjectForm
        onSubmit={handleFormSubmit}
        initialValues={selectedStaff || { subjectName: '', subjectCode: '', creditHours: '' }}
      />
    </div>
  );
};

export default StaffPage;
