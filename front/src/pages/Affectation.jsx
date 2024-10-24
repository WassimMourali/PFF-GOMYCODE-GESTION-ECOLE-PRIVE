import React, { useState } from 'react';
import ADFF from '../components/affectationForm'
import ADF from '../components/affectationsDetailModal'

const AffectationPage = () => {
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleFormSubmit = () => {
    setSelectedStaff(null);
  };

  return (
    <div className='flex w-[1500px]'>
      {}

      <div style={{ padding: '20px' }}>
        {}
        <h3>{selectedStaff ? 'Mettre à jour le personnel' : 'Affectation des Éleves par Classes'}</h3>
        <ADFF
          onSubmit={handleFormSubmit}
          initialValues={selectedStaff ? selectedStaff : undefined}
        />
{}
        <h3>Liste du Personnel</h3>
        <ADF setSelectedStaff={setSelectedStaff} /> {}
      </div>
    </div>
  );
};

export default AffectationPage;
