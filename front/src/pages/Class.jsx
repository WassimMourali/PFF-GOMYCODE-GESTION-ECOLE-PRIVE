import React, { useState } from 'react'; // Utiliser 'react' pour le web
import ClassForm from '../components/classForm'; // Utilisation correcte de la casse (Majuscule)
import ClassList from '../components/classList'; // Utilisation correcte de la casse (Majuscule)

const ClasssPage = () => {
  // Définir l'état pour le personnel sélectionné
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Fonction appelée lors de la soumission du formulaire, elle réinitialise le personnel sélectionné
  const handleFormSubmit = () => {
    setSelectedStaff(null); // Réinitialisation de l'état après la soumission
  };

  return (
    // Conteneur principal avec une classe de flexbox pour la mise en page
    <div className="flex w-full sm:w-full md:w-full lg:w-[1500px] mx-auto p-4">
      {/* Conteneur de la section de formulaire et de la liste */}
      <div style={{ padding: '20px' }} className="w-full">
        
        {/* Titre conditionnel : si un personnel est sélectionné, on affiche "Mettre à jour", sinon "Ajouter" */}
        <h3 className="text-lg font-semibold mb-4">
          {selectedStaff ? 'Mettre à jour le personnel' : 'Ajouter éléves'}
        </h3>

        {/* Formulaire pour ajouter ou mettre à jour les informations du personnel */}
        <ClassForm
          onSubmit={handleFormSubmit} // Fonction appelée à la soumission
          initialValues={selectedStaff ? selectedStaff : undefined} // Valeurs initiales conditionnelles
        />

        {/* Titre de la liste des élèves */}
        <h3 className="text-lg font-semibold mt-8">Liste du Personnel</h3>
        
        {/* Composant de la liste des élèves avec une fonction pour sélectionner un personnel */}
        <ClassList setSelectedStaff={setSelectedStaff} />
      </div>
    </div>
  );
};

export default ClasssPage;
