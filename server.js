const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Importation des routes
const userRoutes = require('./routes/userRoutes');
const boxRoutes = require('./routes/boxRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

app.use('/api/users', userRoutes);
app.use('/api/boxes', boxRoutes);
app.use('/api/reservations', reservationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
