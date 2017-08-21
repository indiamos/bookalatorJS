const Author = require('./author');
const Book = require('./book');
const Genre = require('./genre');
const Sentence = require('./sentence');
const User = require('./user');
const Word = require('./word');

// A many-to-many association such as
//   Model1.belongsToMany(Model2, {through: 'Model2Model1'});
//   Model2.belongsToMany(Model1, {through: 'Model2Model1'});
// creates the following association methods:
//   Model1.getModel2s, Model1.setModel2s, Model1.addModel2, Model1.addModel2s
//   Model2.getModel1s, Model2.setModel1s, Model2.addModel1, Model2.addModel1s.

Author.belongsToMany(Book, { as: 'Works', through: 'author_books', foreignKey: 'creatorId' });
Book.belongsToMany(Author, { as: 'Creators', through: 'author_books', foreignKey: 'workId' });
// Author.getWorks, Author.setWorks, Author.addWork, Author.addWorks
// Book.getCreators, Book.setCreators, Book.addCreator, Book.addCreators.

Book.belongsToMany(Genre, { as: 'Types', through: 'book_genres', foreignKey: 'bookId' });
Genre.belongsToMany(Book, { as: 'Documents', through: 'book_genres', foreignKey: 'genreId' });
// Book.getTypes, Book.setTypes, Book.addType, Book.addTypes
// Genre.getDocuments, Genre.setDocuments, Genre.addDocument, Genre.addDocuments.

Book.hasMany(Sentence);
// Book.getSentences

Sentence.belongsToMany(Word, { as: 'WordTokens', through: 'sentence_words', foreignKey: 'sentenceId' });
Word.belongsToMany(Sentence, { as: 'SentenceTokens', through: 'sentence_words', foreignKey: 'wordId' });
// Sentence.getWordTokens, Sentence.setWordTokens, Sentence.addWordToken, Sentence.addWordTokens
// Word.getSentenceTokens, Word.setSentenceTokens, Word.addSentenceTokens, Word.addSentenceTokens.

Book.belongsToMany(Word, { as: 'Tokens', through: 'book_words', foreignKey: 'bookId' });
Word.belongsToMany(Book, { as: 'Texts', through: 'book_words', foreignKey: 'wordId' });
// Book.getTokens, Book.setTokens, Book.addToken, Book.addTokens
// Word.getTexts, Word.setTexts, Word.addText, Word.addTexts.

module.exports = {
  Author,
  Book,
  Genre,
  Sentence,
  User,
  Word,
};
