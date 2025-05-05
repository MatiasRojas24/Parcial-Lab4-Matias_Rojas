import express from 'express';
import {
  addBookToAuthor,
  createAuthor,
  deleteAuthor,
  getAuthorById,
  getAuthors,
  updateAuthor,
} from '../controllers/authorController.js';

const router = express.Router();

// GET /authors
router.get('/', getAuthors);

// GET /authors/:id
router.get('/:id', getAuthorById);

// POST /authors
router.post('/', createAuthor);

// PUT /authors/:id
router.put('/:id', updateAuthor);

// DELETE /authors/:id
router.delete('/:id', deleteAuthor);

// PUT /authors/:id/addBook/:bookId
router.put('/:id/addBook/:bookId', addBookToAuthor);

export default router;
