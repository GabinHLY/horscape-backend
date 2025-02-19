const Box = require('../models/Box');

exports.getAllBoxes = (req, res) => {
  Box.getAllBoxes((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getBoxById = (req, res) => {
  Box.getBoxById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Box non trouvée' });
    res.json(results[0]);
  });
};

exports.addBox = (req, res) => {
  const { name, location, price } = req.body;
  if (!name || !location || !price) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  Box.addBox(name, location, price, req.user.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Box ajoutée' });
  });
};

exports.updateBox = (req, res) => {
  const { name, location, price } = req.body;

  Box.updateBox(req.params.id, name, location, price, req.user.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Box modifiée' });
  });
};

exports.deleteBox = (req, res) => {
  Box.deleteBox(req.params.id, req.user.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Box supprimée' });
  });
};
