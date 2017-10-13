const db = require('../db');

const Genre = db.model('genre');

const genres = [
  { name: 'Adventure' },
  { name: 'Drama' },
  { name: 'Juvenile' },
  { name: 'Mystery' },
  { name: 'Romance' },
  { name: 'Tragedy' },
  { name: 'Utopian' },
];

function createGenres() {
  Genre.bulkCreate(genres)
    // .then(() => Genre.findAll())
    .then(() => console.log('genres supposedly created…'));
}

module.exports = createGenres;
