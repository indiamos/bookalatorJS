const Author = require('./author');
const Book = require('./book');
const Genre = require('./genre');
const Sentence = require('./sentence');
const User = require('./user');
const Word = require('./word');

Author.belongsToMany(Book, { as: 'Works', through: 'author_books', foreignKey: 'creatorId' });
Book.belongsToMany(Author, { as: 'Creators', through: 'author_books', foreignKey: 'workId' });

Book.belongsToMany(Genre, { as: 'Types', through: 'book_genres', foreignKey: 'bookId' });
Genre.belongsToMany(Book, { as: 'Documents', through: 'book_genres', foreignKey: 'genreId' });

Book.hasMany(Sentence);

Sentence.belongsToMany(Word, { as: 'WordTokens', through: 'sentence_words', foreignKey: 'sentenceId' });
Word.belongsToMany(Sentence, { as: 'SentenceTokens', through: 'sentence_words', foreignKey: 'wordId' });

Book.belongsToMany(Word, { as: 'Tokens', through: 'book_words', foreignKey: 'bookId' });
Word.belongsToMany(Book, { as: 'Texts', through: 'book_words', foreignKey: 'wordId' });

module.exports = {
  Author,
  Book,
  Genre,
  Sentence,
  User,
  Word
};
