const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static getAllUsers(callback) {
    db.query('SELECT * FROM users', callback);
  }

  static getUserById(id, callback) {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  }

  static async createUser(name, email, password, callback) {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
      [name, email, hashedPassword], callback);
  }

  static async updateUser(id, updatedFields, callback) {
    if (updatedFields.password) {
      updatedFields.password = await bcrypt.hash(updatedFields.password, 10);
    }
    db.query('UPDATE users SET ? WHERE id = ?', [updatedFields, id], callback);
  }

  static deleteUser(id, callback) {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
  }

  static getUserByEmail(email, callback) {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  }

  static async updatePassword(id, password, callback) {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id], callback);
  }
}

module.exports = User;
