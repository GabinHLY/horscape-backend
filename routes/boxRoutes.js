const express = require('express');
const router = express.Router();
const boxController = require('../controllers/boxController');
const auth = require('../middleware/auth');

// CRUD de base
router.get('/', boxController.getAllBoxes);
router.get('/:id', boxController.getBoxById);
router.post('/', auth, boxController.addBox);
router.put('/:id', auth, boxController.updateBox);
router.delete('/:id', auth, boxController.deleteBox);

module.exports = router;
