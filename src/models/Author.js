import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  bio: { type: String, required: false },
  fechaNacimiento: { type: Date, required: true },
  nacionalidad: { type: String, required: true },
  libros: { type: mongoose.Schema.Types.ObjectId, ref: 'libros' },
});

export const Author = mongoose.model('autors', authorSchema);
