const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
  } else {
    console.log('✅ Connecté à MySQL sur', process.env.DB_HOST);
  }
});

module.exports = db;
