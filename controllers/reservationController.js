const Reservation = require('../models/Reservation');

exports.getAllReservations = (req, res) => {
  Reservation.getAllReservations((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getReservationById = (req, res) => {
  Reservation.getReservationById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json(results[0]);
  });
};

exports.getUserReservations = (req, res) => {
  Reservation.getUserReservations(req.user.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getOwnerReservations = (req, res) => {
  Reservation.getOwnerReservations(req.user.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.addReservation = (req, res) => {
  const { box_id, start_date, end_date, price_total } = req.body;
  if (!box_id || !start_date || !end_date || !price_total) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  Reservation.addReservation(req.user.id, box_id, start_date, end_date, price_total, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Réservation envoyée' });
  });
};

exports.updateReservation = (req, res) => {
  const { start_date, end_date } = req.body;

  Reservation.updateReservation(req.params.id, req.user.id, start_date, end_date, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Réservation modifiée' });
  });
};

exports.updateStatus = (req, res) => {
  const { status } = req.body;
  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ message: "Statut invalide" });
  }

  // Il faut vérifier que l'utilisateur est bien le propriétaire via une jointure ou middleware si nécessaire
  Reservation.updateStatus(req.params.id, status, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `Réservation ${status}` });
  });
};

exports.cancelReservation = (req, res) => {
  Reservation.cancelReservation(req.params.id, req.user.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Réservation annulée' });
  });
};

exports.deleteReservation = (req, res) => {
  Reservation.deleteReservation(req.params.id, req.user.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Réservation supprimée' });
  });
};

exports.getReservationsByUserId = (req, res) => {
  Reservation.getReservationsByUserId(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getReservationsByBoxId = (req, res) => {
  Reservation.getReservationsByBoxId(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
