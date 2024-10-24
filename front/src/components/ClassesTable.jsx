import React from 'react';
import { motion } from 'framer-motion';

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const ClassesTable = ({ classes }) => {
  return (
    <div className="table-container">
      <h3>Liste des Classes</h3>
      <table>
        <thead>
          <tr>
            <th>Référence</th>
            <th>Capacité</th>
            <th>Niveau</th>
            <th>Numéro de Classe</th>
          </tr>
        </thead>
        <motion.tbody
          initial="hidden"
          animate="visible"
          variants={tableVariants}
        >
          {classes.map((classe) => (
            <motion.tr key={classe._id} whileHover={{ scale: 1.05 }}>
              <td>{classe.classRef}</td>
              <td>{classe.classCapacity}</td>
              <td>{classe.classLevel}</td>
              <td>{classe.classNumber}</td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );
};

export default ClassesTable;
