const db = require('../config/db');

class Reservation {
  static getAllReservations(callback) {
    db.query('SELECT * FROM reservations', callback);
  }

  static getReservationById(id, callback) {
    db.query('SELECT * FROM reservations WHERE id = ?', [id], callback);
  }

  static getUserReservations(renter_id, callback) {
    db.query(
      `SELECT reservations.*, boxes.name as box_name 
       FROM reservations 
       JOIN boxes ON reservations.box_id = boxes.id 
       WHERE reservations.renter_id = ?`,
      [renter_id],
      callback
    );
  }

  static getOwnerReservations(owner_id, callback) {
    db.query(
      `SELECT reservations.*, users.name as renter_name, boxes.name as box_name 
       FROM reservations 
       JOIN boxes ON reservations.box_id = boxes.id 
       JOIN users ON reservations.renter_id = users.id 
       WHERE boxes.owner_id = ?`,
      [owner_id],
      callback
    );
  }

  static addReservation(renter_id, box_id, start_date, end_date, price_total, callback) {
    db.query(
      'INSERT INTO reservations (renter_id, box_id, start_date, end_date, price_total) VALUES (?, ?, ?, ?, ?)',
      [renter_id, box_id, start_date, end_date, price_total],
      callback
    );
  }

  static updateReservation(id, renter_id, start_date, end_date, callback) {
    db.query(
      'UPDATE reservations SET start_date = ?, end_date = ? WHERE id = ? AND renter_id = ?',
      [start_date, end_date, id, renter_id],
      callback
    );
  }

  static updateStatus(id, status, callback) {
    db.query(
      'UPDATE reservations SET status = ? WHERE id = ?',
      [status, id],
      callback
    );
  }

  static cancelReservation(id, renter_id, callback) {
    db.query(
      'UPDATE reservations SET status = "cancelled" WHERE id = ? AND renter_id = ?',
      [id, renter_id],
      callback
    );
  }

  static deleteReservation(id, renter_id, callback) {
    db.query(
      'DELETE FROM reservations WHERE id = ? AND renter_id = ?',
      [id, renter_id],
      callback
    );
  }

  static getReservationsByUserId(userId, callback) {
    db.query('SELECT * FROM reservations WHERE renter_id = ?', [userId], callback);
  }

  static getReservationsByBoxId(boxId, callback) {
    db.query('SELECT * FROM reservations WHERE box_id = ?', [boxId], callback);
  }
}

module.exports = Reservation;
