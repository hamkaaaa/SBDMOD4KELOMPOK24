import { pool } from '../config/db.js';

export const AuthorModel = {
  async getAll(name) {
    let query = 'SELECT * FROM authors';
    const params = [];
    if (name) {
      query += ' WHERE name ILIKE $1';
      params.push(`%${name}%`);
    }
    query += ' ORDER BY name ASC';
    const result = await pool.query(query, params);
    return result.rows;
  },
  async getById(id) {
    const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
    return result.rows[0];
  },
  async create(name, nationality) {
    const query = 'INSERT INTO authors (name, nationality) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [name, nationality]);
    return result.rows[0];
  },
  async update(id, data) {
    const { name, nationality } = data;
    const query = 'UPDATE authors SET name = $1, nationality = $2 WHERE id = $3 RETURNING *';
    const result = await pool.query(query, [name, nationality, id]);
    return result.rows[0];
  },
  async delete(id) {
    await pool.query('DELETE FROM authors WHERE id = $1', [id]);
    return { message: "Penulis berhasil dihapus." };
  }
};
