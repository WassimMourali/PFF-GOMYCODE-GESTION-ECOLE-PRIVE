import React, { useState } from 'react';
import StaffList from '../components/staffList';
import StaffForm from '../components/StaffForm';

const StaffPage = () => {
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleFormSubmit = () => {
    setSelectedStaff(null);
  };

  return (
    <div  className='flex w-[1500px]'>
      {}

      <div style={{ padding: '20px' }}>
        {}
        <h3>{selectedStaff ? 'Mettre à jour le personnel' : 'Ajouter un nouveau personnel'}</h3>
        <StaffForm
          onSubmit={handleFormSubmit}
          initialValues={selectedStaff ? selectedStaff : undefined}
        />

        {}
        <h3>Liste du Personnel</h3>
        <StaffList setSelectedStaff={setSelectedStaff} /> {}
      </div>
    </div>
  );
};

export default StaffPage;
