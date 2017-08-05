import axios from 'axios';
const db = require('../db');
const Author = db.model('author');
const Book = db.model('book');
const Promise = require('bluebird');
module.exports = linkAuthorsBooks;

function fetchSeededAuthors() {
  return axios.get('/api/authors/')
  .catch(error => { console.log(error) });
}

function fetchSeededBooks() {
  return axios.get('/api/books/')
  .catch(error => { console.log(error) });
}

let authorsToLink = fetchSeededAuthors();
let BooksToLink = fetchSeededBooks();

let authorMap = authorsToLink.map(author => { author.lastName: author.id });

function generateAuthorBookLinks() {
  let buildAuthorsBooks = [];
  for (let i = BooksToLink.length - 1; i >= 0; i--) {
    switch(BooksToLink[i].title) {
      case 'Emma':
      case 'Persuasion':
      case 'Sense and Sensibility':
        buildAuthorsBooks.push({
          bookId: BooksToLink[i].id,
          authorId: authorMap.Austen,
        });
        break;
      case 'The Ball and The Cross':
      case 'The Wisdom of Father Brown':
      case 'The Man Who Was Thursday: A Nightmare':
        buildAuthorsBooks.push({
          bookId: BooksToLink[i].id,
          authorId: authorMap.Chesterton,
        });
        break;
      case 'The Parent’s Assistant':
        buildAuthorsBooks.push({
          bookId: BooksToLink[i].id,
          authorId: authorMap.Edgeworth,
        });
        break;
      case 'Herland':
        buildAuthorsBooks.push({
          bookId: BooksToLink[i].id,
          authorId: authorMap.Gilman,
        });
        break;
      case 'Scaramouche: A Romance of the French Revolution':
        buildAuthorsBooks.push({
          bookId: BooksToLink[i].id,
          authorId: authorMap.Sabatini,
        });
        break;
      case 'The Tragedy of Julius Caesar':
      case 'The Tragedy of Hamlet, Prince of Denmark':
      case 'The Tragedy of Macbeth':
        buildAuthorsBooks.push({
          bookId: BooksToLink[i].id,
          authorId: authorMap.Shakespeare,
        });
        break;
      default:
        console.log('WTF was that?!');
    }
  }
  return buildAuthorsBooks;
}

function linkAuthorsBooks() {

}
