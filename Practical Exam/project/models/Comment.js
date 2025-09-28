import db from './database.js';

export class Comment {
  static create(commentData) {
    return new Promise((resolve, reject) => {
      const { content, article_id, author_id } = commentData;
      
      const stmt = db.prepare(`
        INSERT INTO comments (content, article_id, author_id) 
        VALUES (?, ?, ?)
      `);
      
      stmt.run([content, article_id, author_id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, content, article_id, author_id });
        }
      });
      
      stmt.finalize();
    });
  }

  static findByArticle(articleId) {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT c.*, u.username as author_name 
        FROM comments c 
        JOIN users u ON c.author_id = u.id 
        WHERE c.article_id = ? 
        ORDER BY c.created_at ASC
      `, [articleId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM comments WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }
}