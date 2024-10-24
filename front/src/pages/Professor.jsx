import React, { useState } from 'react';
import ProfessorForm from '../components/ProfessorForm';
import ProfessorList from '../components/ProfessorList';


const ProfessorPage = () => {
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  const handleFormSubmit = () => {
    setSelectedProfessor(null);
  };

  return (
    <div  className='flex w-[1500px]'>
      {}

      <div style={{ padding: '20px' }}>
        {}
        <h3>{selectedProfessor ? 'Mettre à jour le personnel' : 'Ajouter un nouveau Enseignant'}</h3>
        <ProfessorForm
          onSubmit={handleFormSubmit}
          initialValues={selectedProfessor ? selectedProfessor : undefined}
        />

        {}
        <h3>Liste du Professeurs</h3>
        <ProfessorList setSelectedProfessor={setSelectedProfessor} /> {}
      </div>
    </div>
  );
};

export default ProfessorPage;
