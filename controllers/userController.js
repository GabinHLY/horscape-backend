const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  User.getUserById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(results[0]);
  });
};

exports.createUser = async (req, res) => {
  const { name, email, password, phone, address, role = 'renter' } = req.body;

  User.createUser(name, email, password, phone, address, role, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Utilisateur créé' });
  });
};

exports.updateUser = async (req, res) => {
  const { password, ...rest } = req.body;
  let updatedFields = rest;
  if (password) updatedFields.password = password;

  User.updateUser(req.params.id, updatedFields, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Utilisateur mis à jour' });
  });
};

exports.deleteUser = (req, res) => {
  User.deleteUser(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Utilisateur supprimé' });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.getUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ message: 'Utilisateur non trouvé' });

    const validPassword = await bcrypt.compare(password, results[0].password);
    if (!validPassword) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign(
      { id: results[0].id, role: results[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  });
};

exports.updatePassword = async (req, res) => {
  const { password } = req.body;

  User.updatePassword(req.params.id, password, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Mot de passe mis à jour' });
  });
};
