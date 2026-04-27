import { BookModel } from '../models/bookModel.js';

export const BookController = {
  async getAllBooks(req, res) {
    try {
      const { title } = req.query; // Menangkap query parameter ?title=
      const books = await BookModel.getAll(title);
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  // ... (biarkan createBook yang sudah ada)
  async getBookById(req, res) {
    try {
      const book = await BookModel.getById(req.params.id);
      if (!book) return res.status(404).json({ error: 'Buku tidak ditemukan' });
      res.json(book);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },
  async updateBook(req, res) {
    try {
      const updatedBook = await BookModel.update(req.params.id, req.body);
      res.json(updatedBook);
    } catch (err) { res.status(400).json({ error: err.message }); }
  },
  async deleteBook(req, res) {
    try {
      const response = await BookModel.delete(req.params.id);
      res.json(response);
    } catch (err) { res.status(500).json({ error: err.message }); }
  }
};
