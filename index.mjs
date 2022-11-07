import express from 'express';
import movies from './movies.json' assert { type: 'json' };
import { writeFileSync } from 'fs';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is working!',
    status: 200,
  });
});

app.get('/movies', (req, res) => {
  res
    .status(200)
    .json({ message: 'fetched data successfully', status: 200, data: movies });
});

app.post('/movies', (req, res) => {
  try {
    if (movies.findIndex((movie) => movie.id === req.body?.id) !== -1) {
      res
        .status(400)
        .json({ message: 'movie with same id exists', status: 400 });
    } else {
      movies.push(req.body);
      writeFileSync('movies.json', JSON.stringify(movies, null, 2));
      res.status(200).json({
        message: 'data updated successfully post',
        status: 200,
        data: movies,
      });
    }
  } catch {
    res.status(400).json({ message: 'some error occured', status: 400 });
  }
});

app.put('/movies', async (req, res) => {
  try {
    const movieIndex = movies.findIndex((movie) => movie.id === req.body?.id);
    if (movieIndex !== -1) {
      movies[movieIndex] = req.body;
    } else {
      movies.push(req.body);
    }
    writeFileSync('movies.json', JSON.stringify(movies, null, 2));
    res.status(200).json({
      message: 'data updated successfully',
      status: 200,
      data: movies,
    });
  } catch {
    res.status(400).json({ message: 'some error occured', status: 400 });
  }
});

app.delete('/movies', (req, res) => {
  try {
    const movieIndex = movies.findIndex((movie) => movie.id === req.body?.id);
    if (movieIndex !== -1) {
      Object.assign(
        movies,
        movies.filter((movie) => movie.id !== req.body?.id)
      );
    } else {
      res.status(400).json({ message: 'movie id not found', status: 400 });
    }
    writeFileSync('movies.json', JSON.stringify(movies, null, 2));
    res.status(200).json({
      message: 'data updated successfully',
      status: 200,
      data: movies,
    });
  } catch {
    res.status(400).json({ message: 'some error occured', status: 400 });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});