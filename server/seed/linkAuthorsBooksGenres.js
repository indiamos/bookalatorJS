const db = require('../db');
const { Author, Book, Genre } = require('../db/models');
const axios = require ('axios');
const Promise = require('bluebird');
module.exports = linkAuthorsBooksGenres;

// TO FIX: I can log the results of the functions getAuthorIds and getGenreIds right before they're passed into generateAuthorBookLinks, but there's some timing issue when  generateAuthorBookLinks actually gets resolved: "ReferenceError: Sabatini is not defined" or (sometimes Shakespeare), or "ReferenceError: Adventure is not defined."
function getAuthorIds(authorsToLink) {
  let authorMap = {};
  authorsToLink.forEach(author => {
    let key = author.dataValues.lastName;
    authorMap[key] = author.dataValues.id;
  });
  return authorMap;
}

function getGenreIds(genresToLink) {
  let genreMap = {};
  genresToLink.forEach(genre => {
    let key = genre.name;
    genreMap[key] = genre.id;
  });
  return genreMap;
}

// TO FIX: Dynamic associations, which are falling victim to some fucking race condition, and I can't figure out why.
// ------------------------------------------
// function generateAuthorBookLinks(BooksToLink, authorIDs, genreIDs) {
//   let buildAuthorsBooksGenres = [];
//   for (let i = BooksToLink.length - 1; i >= 0; i--) {
//     switch(BooksToLink[i].title) {
//       case 'Emma':
//       case 'Persuasion':
//       case 'Sense and Sensibility':
//         buildAuthorsBooksGenres.push(BooksToLink[i].addCreator(authorIDs[Austen]));
//         buildAuthorsBooksGenres.push(BooksToLink[i].addType(genreIDs[Romance]));
//         break;
//       case 'The Ball and The Cross':
//       case 'The Wisdom of Father Brown':
//       case 'The Man Who Was Thursday: A Nightmare':
//         buildAuthorsBooksGenres.push(BooksToLink[i].addCreator(authorIDs[Chesterton]));
//         buildAuthorsBooksGenres.push(BooksToLink[i].addType(genreIDs[Mystery]));
//         break;
//       case 'The Parent’s Assistant':
//         buildAuthorsBooksGenres.push(BooksToLink[i].addCreator(authorIDs[Edgeworth]));
//         buildAuthorsBooksGenres.push(BooksToLink[i].addType(genreIDs[Juvenile]));
//         break;
//       case 'Herland':
//         buildAuthorsBooksGenres.push(BooksToLink[i].addCreator(authorIDs[Gilman]));
//         buildAuthorsBooksGenres.push(BooksToLink[i].addType(genreIDs[Utopian]));
//         break;
//       case 'Scaramouche: A Romance of the French Revolution':
//         buildAuthorsBooksGenres.push(BooksToLink[i].addCreator(authorIDs[Sabatini]));
//         buildAuthorsBooksGenres.push(BooksToLink[i].addType(genreIDs[Adventure]));
//         break;
//       case 'The Tragedy of Julius Caesar':
//       case 'The Tragedy of Hamlet, Prince of Denmark':
//       case 'The Tragedy of Macbeth':
//         buildAuthorsBooksGenres.push(BooksToLink[i].addCreator(authorIDs[Shakespeare]));
//         buildAuthorsBooksGenres.push(BooksToLink[i].addType(genreIDs[Drama]));
//         buildAuthorsBooksGenres.push(BooksToLink[i].addType(genreIDs[Tragedy]));
//         break;
//       default:
//         console.log(`WTF book is ${BooksToLink[i].title}?!`);
//     }
//   }
//   return buildAuthorsBooksGenres;
// }

// WORKAROUND: Hard-coded associations, which will not always be accurate:
// ------------------------------------------
function generateAuthorBookLinks(BooksToLink, authorIDs, genreIDs) {
  let buildAuthorsBooksGenres = [];
  for (let i = BooksToLink.length - 1; i >= 0; i--) {
    switch(BooksToLink[i].title) {
      case 'Emma':
      case 'Persuasion':
      case 'Sense and Sensibility':
        buildAuthorsBooksGenres.push(BooksToLink[i].addCreator(1));
        buildAuthorsBooksGenres.push(BooksToLink[i].addType(5));
        break;
      case 'The Ball and The Cross':
      case 'The Wisdom of Father Brown':
      case 'The Man Who Was Thursday: A Nightmare':
        buildAuthorsBooksGenres.push(BooksToLink[i].addCreator(2));
        buildAuthorsBooksGenres.push(BooksToLink[i].addType(4));
        break;
      case 'The Parent’s Assistant':
        buildAuthorsBooksGenres.push(BooksToLink[i].addCreator(3));
        buildAuthorsBooksGenres.push(BooksToLink[i].addType(3));
        break;
      case 'Herland':
        buildAuthorsBooksGenres.push(BooksToLink[i].addCreator(4));
        buildAuthorsBooksGenres.push(BooksToLink[i].addType(7));
        break;
      case 'Scaramouche: A Romance of the French Revolution':
        buildAuthorsBooksGenres.push(BooksToLink[i].addCreator(5));
        buildAuthorsBooksGenres.push(BooksToLink[i].addType(1));
        break;
      case 'The Tragedy of Julius Caesar':
      case 'The Tragedy of Hamlet, Prince of Denmark':
      case 'The Tragedy of Macbeth':
        buildAuthorsBooksGenres.push(BooksToLink[i].addCreator(6));
        buildAuthorsBooksGenres.push(BooksToLink[i].addType(2));
        buildAuthorsBooksGenres.push(BooksToLink[i].addType(6));
        break;
      default:
        console.log(`WTF book is ${BooksToLink[i].title}?!`);
    }
  }
  return buildAuthorsBooksGenres;
}

function linkAuthorsBooksGenres() {
  // 1. Get all the data that was just seeded
  return Promise.all([
    Author.findAll(),
    Book.findAll(),
    Genre.findAll()
  ])
  .spread((authors, books, genres) => {
  // 2. Extract the record IDs so we can get at them
    let authorMap = getAuthorIds(authors);
    let genreMap = getGenreIds(genres);
    let returnObject = {books, authorMap, genreMap};
    return returnObject;
  })
  .then(({books, authorMap, genreMap}) => {
// 3. Make a promise glob of all the association things, which gets run by seed.js
    return Promise.map(generateAuthorBookLinks(books, authorMap, genreMap), buildAuthorsBooksGenres => {
      return buildAuthorsBooksGenres;
    });
  })
}
