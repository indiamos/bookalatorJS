const Author = require('./author');
const Book = require('./book');
const User = require('./user');

Author.hasMany(Book);
Book.hasMany(Author);

module.exports = {
  Author,
  Book,
  User
};
