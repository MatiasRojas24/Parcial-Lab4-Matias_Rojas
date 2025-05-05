import { Author } from '../models/Author.js';
import { Book } from '../models/Book.js';

// GET /books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
};

// GET /books/:id
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el libro' });
  }
};

// POST /books
export const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error al crear el libro', detalle: error.message });
  }
};

// PUT /books/:id
export const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook)
      return res.status(404).json({ error: 'Libro no encontrado' });
    res.status(200).json(updatedBook);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error al actualizar el libro', detalle: error.message });
  }
};

// DELETE /books/:id
export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ error: 'Libro no encontrado' });

    const authors = Author.find();
    authors.map((author) => {
      if (author.libros.includes(bookId))
        return res.status(400).json({
          error: 'No es posible eliminar un libro que pertenezca a un autor',
        });
    });
    res.status(200).json({ mensaje: 'Libro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
};
