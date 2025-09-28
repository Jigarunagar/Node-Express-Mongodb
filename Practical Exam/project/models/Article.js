import db from './database.js';

export class Article {
  static create(articleData) {
    return new Promise((resolve, reject) => {
      const { title, content, author_id } = articleData;
      
      const stmt = db.prepare(`
        INSERT INTO articles (title, content, author_id) 
        VALUES (?, ?, ?)
      `);
      
      stmt.run([title, content, author_id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, title, content, author_id });
        }
      });
      
      stmt.finalize();
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT a.*, u.username as author_name 
        FROM articles a 
        JOIN users u ON a.author_id = u.id 
        ORDER BY a.created_at DESC
      `, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get(`
        SELECT a.*, u.username as author_name 
        FROM articles a 
        JOIN users u ON a.author_id = u.id 
        WHERE a.id = ?
      `, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static findByAuthor(authorId) {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT a.*, u.username as author_name 
        FROM articles a 
        JOIN users u ON a.author_id = u.id 
        WHERE a.author_id = ? 
        ORDER BY a.created_at DESC
      `, [authorId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static update(id, articleData) {
    return new Promise((resolve, reject) => {
      const { title, content } = articleData;
      
      db.run(`
        UPDATE articles 
        SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `, [title, content, id], function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM articles WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }
}