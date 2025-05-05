import express from 'express';
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from '../controllers/bookController.js';

const router = express.Router();

// GET /books
router.get('/', getBooks);

// GET /books/:id
router.get('/:id', getBookById);

// POST /books/:id
router.post('/', createBook);

// PUT /books/:id
router.put('/:id', updateBook);

// DELETE /books/:id
router.delete('/:id', deleteBook);

export default router;
