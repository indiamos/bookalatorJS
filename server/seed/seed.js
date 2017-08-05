const db = require('../db');
const Author = db.model('author');
const Book = db.model('book');
const Genre = db.model('genre');
const User = db.model('user');
const Word = db.model('word');

const createAuthors = require('./createAuthors');
const createBooks = require('./createBooks');
const createGenres = require('./createGenres');
const createUsers = require('./createUsers');
// const createWords = require('./createWords');
// const createAuthorsBooks = require('./createAuthorsBooks');
// const createBooksGenres = require('./createBooksGenres');

const Promise = require('bluebird');
// const chance = require('chance')(123);

function doTimes (n, fn) {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

//SEEDING

function seed() {
  let arr = [
    createAuthors(),
    createBooks(),
    createGenres(),
    createUsers()
  ];
  return Promise.all(arr);
}

// function seedConnections() {
//   let arr = [
//     createAuthorsBooks(),
//     createBooksGenres(),
//     createWords()
//   ];
//   return Promise.all(arr);
// }

console.log('Syncing database');

db.sync({force: true})
.then(() => {
  console.log('Seeding database');
  return seed();
})
// .then(() => {
//   console.log('Connecting newly seeded data');
//   return seedConnections();
// })
.then(function () {
  console.log('Seeding successful');
}, function (err) {
  console.error('Error while seeding');
  console.error(err.stack);
})
.finally(function () {
  db.close();
  return null;
});
