const db = require('../config/db');

class Box {
  static getAllBoxes(callback) {
    db.query(
      'SELECT boxes.*, users.name as owner_name FROM boxes JOIN users ON boxes.owner_id = users.id', 
      callback
    );
  }

  static getBoxById(id, callback) {
    db.query('SELECT * FROM boxes WHERE id = ?', [id], callback);
  }

  static addBox(name, location, price, owner_id, callback) {
    db.query(
      'INSERT INTO boxes (name, location, price, owner_id) VALUES (?, ?, ?, ?)', 
      [name, location, price, owner_id], 
      callback
    );
  }

  static updateBox(id, name, location, price, owner_id, callback) {
    db.query(
      'UPDATE boxes SET name = ?, location = ?, price = ? WHERE id = ? AND owner_id = ?', 
      [name, location, price, id, owner_id], 
      callback
    );
  }

  static deleteBox(id, owner_id, callback) {
    db.query(
      'DELETE FROM boxes WHERE id = ? AND owner_id = ?', 
      [id, owner_id], 
      callback
    );
  }
}

module.exports = Box;
