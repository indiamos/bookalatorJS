const Promise = require('bluebird');
const db = require('../db');

const createAuthors = require('./createAuthors');
const createBooks = require('./createBooks');
const createGenres = require('./createGenres');
const createUsers = require('./createUsers');
const linkAuthorsBooksGenres = require('./linkAuthorsBooksGenres');

// Create all the individual records
function seed() {
  const arr = [
    createAuthors(),
    createBooks(),
    createGenres(),
    createUsers(),
  ];
  return Promise.all(arr);
}

console.log('Syncing database…');

db.sync({ force: true })
  .then(() => {
    console.log('Seeding database…');
    return seed();
  })
  .then(() => {
    console.log('Linking newly seeded records…');
    return linkAuthorsBooksGenres();
  })
  .then(() => {
    console.log('Seeding successful!');
  }, (err) => {
    console.error('Error while seeding :(');
    console.error(err.stack);
  })
  .finally(() => {
    db.close();
    return null;
  });
