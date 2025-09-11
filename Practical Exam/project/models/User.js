import db from './database.js';
import bcrypt from 'bcryptjs';

export class User {
  static create(userData) {
    return new Promise((resolve, reject) => {
      const { username, password, role = 'user' } = userData;
      const hashedPassword = bcrypt.hashSync(password, 10);
      
      const stmt = db.prepare(`
        INSERT INTO users (username, password, role) 
        VALUES (?, ?, ?)
      `);
      
      stmt.run([username, hashedPassword, role], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, username, role });
        }
      });
      
      stmt.finalize();
    });
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT id, username, role, created_at FROM users WHERE id = ?',
        [id],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  static verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}