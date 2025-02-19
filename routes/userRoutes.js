const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD de base
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Authentification
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/:id/password', userController.updatePassword);

module.exports = router;
