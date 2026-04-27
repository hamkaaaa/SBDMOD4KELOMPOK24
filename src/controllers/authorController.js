import { AuthorModel } from '../models/authorModel.js';

export const AuthorController = {
  async getAuthors(req, res) {
    try {
      const { name } = req.query;
      const authors = await AuthorModel.getAll(name);
      res.json(authors);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },
  async getAuthorById(req, res) {
    try {
      const author = await AuthorModel.getById(req.params.id);
      if (!author) return res.status(404).json({ error: 'Penulis tidak ditemukan' });
      res.json(author);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },
  async addAuthor(req, res) {
    try {
      const { name, nationality } = req.body;
      const author = await AuthorModel.create(name, nationality);
      res.status(201).json(author);
    } catch (err) { res.status(400).json({ error: err.message }); }
  },
  async updateAuthor(req, res) {
    try {
      const author = await AuthorModel.update(req.params.id, req.body);
      res.json(author);
    } catch (err) { res.status(400).json({ error: err.message }); }
  },
  async deleteAuthor(req, res) {
    try {
      const response = await AuthorModel.delete(req.params.id);
      res.json(response);
    } catch (err) { res.status(500).json({ error: err.message }); }
  }
};
