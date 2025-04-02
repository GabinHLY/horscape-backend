const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  console.log("Token reçu :", token);

  if (!token) return res.status(401).json({ message: 'Accès refusé' });

  try {
    const cleanToken = token.replace("Bearer ", "");
    console.log("Token nettoyé :", cleanToken);

    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    console.log("Payload JWT :", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erreur JWT :", error.message);
    res.status(400).json({ message: 'Token invalide' });
  }
};
