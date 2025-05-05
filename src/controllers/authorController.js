import { Author } from '../models/Author.js';

// GET /authors
export const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().populate('libros');
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener autores' });
  }
};

// GET /authors/:id
export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener autor' });
  }
};

// POST /authors
export const createAuthor = async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error al crear autor', detalle: error.message });
  }
};

// PUT /authors/:id
export const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedAuthor)
      return res.status(404).json({ error: 'Autor no encontrado' });
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error al actualizar autor', detalle: error.message });
  }
};

// DELETE /authors/:id
export const deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor)
      return res.status(404).json({ error: 'Autor no encontrado' });
    res.status(200).json({ mensaje: 'Autor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar autor' });
  }
};

// PUT /authors/:id/addBook/:bookId
export const addBookToAuthor = async (req, res) => {
  try {
    const { id, bookId } = req.params.id;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: 'Libro no encontrado' });

    const author = await Author.findById(id);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });

    if (author.libros.includes(bookId))
      return res.status(400).json({ error: 'El libro ya pertenece al autor' });

    author.libros.push(bookId);
    await author.save();
    res
      .status(200)
      .json({ mensaje: 'Libro agregado al autor correctamente', author });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el libro al Autor' });
  }
};
