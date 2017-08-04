const Author = require('./author');
const Book = require('./book');
const Genre = require('./genre');
const User = require('./user');
const Word = require('./word');

Author.hasMany(Book);
Book.hasMany(Author);
Book.hasMany(Genre);
Book.hasMany(Word);
Genre.hasMany(Book);
Word.hasMany(Book);

module.exports = {
  Author,
  Book,
  Genre,
  User,
  Word
};
