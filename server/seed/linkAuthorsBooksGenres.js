const Promise = require('bluebird');
const { Author, Book, Genre } = require('../db/models');

function getAuthorIds(authorsToLink) {
  const authorMap = new Map();
  authorsToLink.forEach((author) => {
    authorMap.set(author.dataValues.lastName, author.dataValues.id);
  });
  // console.log('authorMap:', authorMap);
  return authorMap;
}

function getGenreIds(genresToLink) {
  const genreMap = new Map();
  genresToLink.forEach((genre) => {
    genreMap.set(genre.name, genre.id);
  });
  // console.log('genreMap:', genreMap);
  return genreMap;
}

function generateAuthorBookLinks(BooksToLink, authorMap, genreMap) {
  const buildAuthorsBooksGenres = [];
  BooksToLink.forEach((book) => {
    switch (book.title) {
      case 'Emma':
      case 'Persuasion':
      case 'Sense and Sensibility':
        buildAuthorsBooksGenres.push(book.addCreator(authorMap.get('Austen')));
        buildAuthorsBooksGenres.push(book.addType(genreMap.get('Romance')));
        break;
      case 'The Ball and The Cross':
      case 'The Wisdom of Father Brown':
      case 'The Man Who Was Thursday: A Nightmare':
        buildAuthorsBooksGenres.push(book.addCreator(authorMap.get('Chesterton')));
        buildAuthorsBooksGenres.push(book.addType(genreMap.get('Mystery')));
        break;
      case 'The Parent’s Assistant':
        buildAuthorsBooksGenres.push(book.addCreator(authorMap.get('Edgeworth')));
        buildAuthorsBooksGenres.push(book.addType(genreMap.get('Juvenile')));
        break;
      case 'Herland':
        buildAuthorsBooksGenres.push(book.addCreator(authorMap.get('Gilman')));
        buildAuthorsBooksGenres.push(book.addType(genreMap.get('Utopian')));
        break;
      case 'Scaramouche: A Romance of the French Revolution':
        buildAuthorsBooksGenres.push(book.addCreator(authorMap.get('Sabatini')));
        buildAuthorsBooksGenres.push(book.addType(genreMap.get('Adventure')));
        break;
      case 'The Tragedy of Julius Caesar':
      case 'The Tragedy of Hamlet, Prince of Denmark':
      case 'The Tragedy of Macbeth':
        buildAuthorsBooksGenres.push(book.addCreator(authorMap.get('Shakespeare')));
        buildAuthorsBooksGenres.push(book.addType(genreMap.get('Drama')));
        buildAuthorsBooksGenres.push(book.addType(genreMap.get('Tragedy')));
        break;
      default:
        console.log(`WTF book is ${book.title}?!`);
    }
  });
  return buildAuthorsBooksGenres;
}

function linkAuthorsBooksGenres() {
  // 1. Get ids and unique properties for all the records that were just seeded
  return Promise.all([
    Author.findAll({
      attributes: ['id', 'lastName'],
    }),
    Book.findAll({
      attributes: ['id', 'title'],
    }),
    Genre.findAll({
      attributes: ['id', 'name'],
    }),
  ])
    .spread((authors, books, genres) => {
    // 2. Extract the record IDs so we can get at them
      const authorMap = getAuthorIds(authors);
      const genreMap = getGenreIds(genres);
      const returnObject = { books, authorMap, genreMap };
      return returnObject;
    })
  // 3. Make a promise glob of all the association things, which gets run by seed.js
    .then(({ books, authorMap, genreMap }) =>
      Promise.map(generateAuthorBookLinks(books, authorMap, genreMap),
        buildAuthorsBooksGenres => buildAuthorsBooksGenres));
}

module.exports = linkAuthorsBooksGenres;
