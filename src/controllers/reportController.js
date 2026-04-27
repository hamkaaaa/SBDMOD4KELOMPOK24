import { pool } from '../config/db.js';

export const ReportController = {
  async getStats(req, res) {
    try {
      const [booksResult, authorsResult, categoriesResult, loansResult] = await Promise.all([
        pool.query('SELECT COUNT(*) FROM books'),
        pool.query('SELECT COUNT(*) FROM authors'),
        pool.query('SELECT COUNT(*) FROM categories'),
        pool.query("SELECT COUNT(*) FROM loans WHERE status = 'BORROWED' OR status IS NULL")
      ]);

      res.json({
        total_books: parseInt(booksResult.rows[0].count),
        total_authors: parseInt(authorsResult.rows[0].count),
        total_categories: parseInt(categoriesResult.rows[0].count),
        active_borrowed_loans: parseInt(loansResult.rows[0].count)
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
