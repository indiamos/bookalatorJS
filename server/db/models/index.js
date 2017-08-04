const Author = require('./author');
const Book = require('./book');
const Genre = require('./genre');
const User = require('./user');

Author.hasMany(Book);
Book.hasMany(Author);
Book.hasMany(Genre);
Genre.hasMany(Book);

module.exports = {
  Author,
  Book,
  Genre,
  User
};
