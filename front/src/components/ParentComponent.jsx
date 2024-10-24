import React, { useState } from 'react';
import StudentUpdate from '../components/studentUpdate';

const ParentComponent = () => {
  const [students, setStudents] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const updateStudentList = (updatedStudent) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student._id === updatedStudent._id ? updatedStudent : student
      )
    );
  };

  const handleUpdateClick = (student) => {
    setSelectedStudent(student);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  return (
    <div>
      {}
      {students.map(student => (
        <div key={student._id}>
          <span>{student.name}</span>
          <button onClick={() => handleUpdateClick(student)}>Mettre à jour</button>
        </div>
      ))}
      {selectedStudent && (
        <StudentUpdate
          show={showUpdateModal}
          handleClose={handleCloseUpdateModal}
          selectedStudent={selectedStudent}
          updateStudentList={updateStudentList}
        />
      )}
    </div>
  );
};

export default ParentComponent;
