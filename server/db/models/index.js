const Author = require('./author');
const Book = require('./book');
const Genre = require('./genre');
const User = require('./user');
const Word = require('./word');

Author.belongsToMany(Book, { as: 'Works', through: 'author_books', foreignKey: 'creatorId' })
Book.belongsToMany(Author, { as: 'Creators', through: 'author_books', foreignKey: 'workId' })

Book.belongsToMany(Genre, { as: 'Types', through: 'book_genres', foreignKey: 'bookId' })
Genre.belongsToMany(Book, { as: 'Documents', through: 'book_genres', foreignKey: 'genreId' })

Book.belongsToMany(Word, { as: 'Tokens', through: 'book_words', foreignKey: 'bookId' })
Word.belongsToMany(Book, { as: 'Texts', through: 'book_words', foreignKey: 'wordId' })

module.exports = {
  Author,
  Book,
  Genre,
  User,
  Word
};
