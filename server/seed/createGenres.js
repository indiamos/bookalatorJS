const db = require('../db');
const Genre = db.model('genre');

const Promise = require('bluebird');

let genreList = [
  'Adventure',
  'Drama',
  'Juvenile',
  'Mystery',
  'Romance',
  'Tragedy',
  'Utopian'
];

function generateGenres () {
  let genres = [];
  genreList.forEach(name => {
    genres.push(Genre.build({ name }));
  })
  return genres;
}

function createGenres () {
  return Promise.map(generateGenres(), function (genre) {
    return genre.save();
  });
}

module.exports = createGenres;

