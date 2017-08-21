const db = require('../db');

// const Author = db.model('author');
// const Book = db.model('book');
// const Genre = db.model('genre');
// const Sentence = db.model('sentence');
// const User = db.model('user');
// const Word = db.model('word');

const createAuthors = require('./createAuthors');
const createBooks = require('./createBooks');
const createGenres = require('./createGenres');
const createUsers = require('./createUsers');

const linkAuthorsBooksGenres = require('./linkAuthorsBooksGenres');

const Promise = require('bluebird');
// const chance = require('chance')(123);

// SEEDING

function seed() {
  const arr = [
    createAuthors(),
    createBooks(),
    createGenres(),
    createUsers(),
  ];
  return Promise.all(arr);
}

function seedLinks() {
  const arr = [
    linkAuthorsBooksGenres(),
  ];
  return Promise.all(arr);
}

console.log('Syncing database');

db.sync({ force: true })
  .then(() => {
    console.log('Seeding database');
    return seed();
  })
  .then(() => {
    console.log('Link newly seeded data');
    return seedLinks();
    // return linkAuthorsBooksGenres();
  })
  .then(() => {
    console.log('Seeding successful');
  }, (err) => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(() => {
    db.close();
    return null;
  });
