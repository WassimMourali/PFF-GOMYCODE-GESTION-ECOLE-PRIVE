import React, { useState } from 'react';
import EmploiForm from '../components/emploiForm';
import EmploiDashboard from '../components/EmploiDashboard';

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
        <EmploiForm
          onSubmit={handleFormSubmit}
          initialValues={selectedStaff ? selectedStaff : undefined}
        />

        {}
        <EmploiDashboard setSelectedStaff={setSelectedStaff} /> {}
      </div>
    </div>
  );
};

export default StaffPage;
