const db = require('../db');

const Genre = db.model('genre');

const Promise = require('bluebird');

const genreList = [
  'Adventure',
  'Drama',
  'Juvenile',
  'Mystery',
  'Romance',
  'Tragedy',
  'Utopian',
];

function generateGenres() {
  const genres = [];
  genreList.forEach((name) => {
    genres.push(Genre.build({ name }));
  });
  return genres;
}

function createGenres() {
  return Promise.map(generateGenres(), genre => genre.save());
}

module.exports = createGenres;

