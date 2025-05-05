import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import bookRoutes from './routes/books.js';
import authorRoutes from './routes/authors.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/apiParcial/books', bookRoutes);
app.use('/apiParcial/authors', authorRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en el puerto: ', process.env.PORT || 3000);
  mongoose
    .connect(process.env.MONGO_URL + process.env.DB_NAME)
    .then(() => {
      console.log('Conectado a mongoDB');
    })
    .catch((e) => console.error(e));
});
