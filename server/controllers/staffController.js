const Staff = require('../models/staff');

exports.createStaff = (req, res) => {
    const staff = new Staff(req.body);
    staff.save()
        .then((savedStaff) => {
            res.status(201).json(savedStaff);
        })
        .catch((error) => {
            res.status(400).json({ message: 'Erreur de validation du personnel', error });
        });
};

exports.getStaff = (req, res) => {
    Staff.find()
      .then((staffs) => {
        res.status(200).json(staffs);
      })
      .catch((error) => {
        res.status(500).json({ message: 'Erreur du serveur', error });
      });
};

exports.updateStaff = (req, res) => {
    const staffId = req.params.id;
    const updatedData = req.body;
  
    Staff.findByIdAndUpdate(staffId, updatedData, { new: true, runValidators: true })
      .then((updatedStaff) => {
        if (!updatedStaff) {
          return res.status(404).json({ message: 'Staff non trouvé' });
        }
        res.status(200).json(updatedStaff);
      })
      .catch((error) => {
        res.status(500).json({ message: 'Erreur du serveur', error });
      });
  };

  exports.deleteStaff = (req, res) => {
    const staffId = req.params.id;
  
    Staff.findByIdAndDelete(staffId)
      .then(staff => {
        if (!staff) {
          return res.status(404).json({ message: 'Staff non trouvé' });
        }
        res.status(200).json({ message: 'Staff supprimé avec succès' });
      })
      .catch(error => {
        res.status(500).json({ message: 'Erreur du serveur', error });
      });
  };