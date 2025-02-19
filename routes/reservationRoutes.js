const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const auth = require('../middleware/auth');

// CRUD de base
router.get('/', reservationController.getAllReservations);
router.get('/:id', reservationController.getReservationById);
router.get('/my-reservations', auth, reservationController.getUserReservations);
router.get('/my-boxes', auth, reservationController.getOwnerReservations);
router.post('/', auth, reservationController.addReservation);
router.put('/:id', auth, reservationController.updateReservation);
router.put('/:id/status', auth, reservationController.updateStatus);
router.put('/:id/cancel', auth, reservationController.cancelReservation);
router.delete('/:id', auth, reservationController.deleteReservation);

// Gestion spécifique
router.get('/user/:id', reservationController.getReservationsByUserId);
router.get('/box/:id', reservationController.getReservationsByBoxId);

module.exports = router;
