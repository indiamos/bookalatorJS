const db = require('../db');

const Author = db.model('author');

const authors = [
  {
    firstName: 'Jane',
    lastName: 'Austen',
    gender: 'female',
    birthYear: 1775,
    deathYear: 1817,
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/CassandraAusten-JaneAusten%28c.1810%29_hires.jpg',
    pgURL: 'https://www.gutenberg.org/ebooks/author/68',
    wikipediaURL: 'https://en.wikipedia.org/wiki/Jane_Austen',
  },
  {
    firstName: 'G. K.',
    lastName: 'Chesterton',
    gender: 'male',
    birthYear: 1874,
    deathYear: 1936,
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Gilbert_Chesterton.jpg',
    pgURL: 'https://www.gutenberg.org/ebooks/author/80',
    wikipediaURL: 'https://en.wikipedia.org/wiki/G._K._Chesterton',
  },
  {
    firstName: 'Maria',
    lastName: 'Edgeworth',
    gender: 'female',
    birthYear: 1768,
    deathYear: 1849,
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Maria_Edgeworth_by_John_Downman_1807.jpg',
    pgURL: 'https://www.gutenberg.org/ebooks/author/630',
    wikipediaURL: 'https://en.wikipedia.org/wiki/Maria_Edgeworth',
  },
  {
    firstName: 'Charlotte Perkins',
    lastName: 'Gilman',
    gender: 'female',
    birthYear: 1860,
    deathYear: 1935,
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Charlotte_Perkins_Gilman_c._1900.jpg',
    pgURL: 'https://www.gutenberg.org/ebooks/author/27',
    wikipediaURL: 'https://en.wikipedia.org/wiki/Charlotte_Perkins_Gilman',
  },
  {
    firstName: 'Rafael',
    lastName: 'Sabatini',
    gender: 'male',
    birthYear: 1875,
    deathYear: 1950,
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Portrait_of_Rafael_Sabatini.jpg',
    pgURL: 'https://www.gutenberg.org/ebooks/author/640',
    wikipediaURL: 'https://en.wikipedia.org/wiki/Rafael_Sabatini',
  },
  {
    firstName: 'William',
    lastName: 'Shakespeare',
    gender: 'male',
    birthYear: 1564,
    deathYear: 1616,
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg',
    pgURL: 'https://www.gutenberg.org/ebooks/author/65',
    wikipediaURL: 'https://en.wikipedia.org/wiki/William_Shakespeare',
  },
];

function createAuthors() {
  Author.bulkCreate(authors)
    .then(() => console.log('createAuthors supposedly resolved…'));
}

module.exports = createAuthors;

