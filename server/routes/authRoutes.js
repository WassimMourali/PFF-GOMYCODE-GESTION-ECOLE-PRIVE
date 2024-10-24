const express = require('express');
const { login } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

// Route de connexion (publique)
router.post('/login', login);

// Route protégée accessible uniquement aux utilisateurs authentifiés (peu importe le rôle)
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

// Route protégée accessible uniquement aux administrateurs
router.get('/admin-only', verifyToken, checkRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});

module.exports = router;
