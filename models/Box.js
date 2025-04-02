const db = require('../config/db');

class Box {
  static getAllBoxes(callback) {
    db.query(
      `SELECT boxes.*, users.name as owner_name 
       FROM boxes 
       LEFT JOIN users ON boxes.owner_id = users.id`, 
      callback
    );    
  }

  static getBoxById(id, callback) {
    db.query('SELECT * FROM boxes WHERE id = ?', [id], callback);
  }

  static addBox(name, description, price, adress, owner_id, callback) {
    db.query(
      'INSERT INTO boxes (name, description, price, adress, owner_id) VALUES (?, ?, ?, ?, ?)', 
      [name, description, price, adress, owner_id], 
      callback
    );
  }

  static updateBox(id, name, description, price, adress, owner_id, callback) {
    db.query(
      'UPDATE boxes SET name = ?, description = ?, price = ?, adress = ? WHERE id = ? AND owner_id = ?', 
      [name, description, price, adress, id, owner_id], 
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
