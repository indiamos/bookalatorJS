const router = require('express').Router()
const { Book, Word } = require('../db/models')
module.exports = {
  router,
  findSentences
};

const natural = require('natural');
const wordTokenizer = new natural.WordTokenizer();
const sentenceTokenizer = new natural.SentenceTokenizer();

// GET      /api/books/                     // returns metadata for all books
// POST     /api/books/                     // creates a new book
// GET      /api/books/:bookId              // returns metadata for a given book
// PUT      /api/books/:bookId              // updates a book
// DELETE   /api/books/:bookId              // deletes a book
// GET      /api/books/:bookId/word/:word   // returns all sentences in a given book that contain a given word
// GET      /api/books/:bookId/sentences    // returns all  sentences in a given book
// GET      /api/books/:bookId/words        // returns all words in a book

// GET /api/books/
router.get('/', (req, res, next) => {
  Book.findAll()
  .then(books => res.json(books))
  .catch(next);
});

// POST /api/books/
// Books should be tokenized during the import process—probably as an afterCreate hook.
router.post('/', (req, res, next) => {
  Book.create(req.body)
  .then(book => res.status(201).json(book))
  .catch(next);
});

// GET /api/books/:bookId
router.get('/:bookId', (req, res, next) => {
  Book.findById(req.params.bookId)
  .then(book => res.json(book))
  .catch(next);
});

// PUT /api/books/:bookId
router.put('/:bookId', (req, res, next) => {
  Book.findById(req.params.bookId)
  .then(book => book.update(req.body))
  .then(updated => {
    let revised = updated.dataValues; // putting this value directly in line 39 errors
    res.send({ message: 'Updated sucessfully', revised })
  })
  .catch(next);
});

// DELETE /api/books/:bookId
router.delete('/:bookId', (req, res, next) => {
  Book.findById(req.params.bookId)
  .then(foundBook => foundBook.destroy())
  .then(result => {
    res.send({ message: 'Deleted successfully' })
  })
  .catch(next);
});

// ------------------------ BOOK-WORD ROUTES -----------------------------------

// Given a lump of text and a word to search for, return an array of sentences that contain the word.
// It might be a good idea to store these results in the database, for faster subsequent lookups.
function findSentences(text, word) {
  return sentenceTokenizer.tokenize(text).filter(sentence => {
    return sentence.trim().indexOf(word) > -1;
  });
}

// GET /api/books/:bookId/word/:word
// Returns an array of all sentences in a given book that contain a given word.
router.get('/:bookId/word/:word', (req, res, next) => {
  Book.findById(req.params.bookId)
  .then(foundBook => findSentences(foundBook.text, req.params.word))
  .then(foundsentences => res.json(foundsentences))
  .catch(next);
});

// GET /api/books/:bookId/sentences
// Returns an array of all sentences in a given book
// To do: Should check whether the book has already been tokenized.
// If true, retrieve existing sentence list.
// If false, post the array to the sentence table.
router.get('/:bookId/sentences', (req, res, next) => {
  Book.findById(req.params.bookId)
  .then(foundBook => sentenceTokenizer.tokenize(foundBook.text))
  .then(allSentences => res.json(allSentences))
  .catch(next);
});

// GET /api/books/:bookId/words
// Returns a list of all words in a book.
// To do: Should check whether the book has already been tokenized.
// If true, retrieve existing word list.
// If false, post the array to the word table.
router.get('/:bookId/words', (req, res, next) => {
  Book.findById(req.params.bookId)
  .then(foundBook => wordTokenizer.tokenize(foundBook.text))
  .then(allWords => res.json(allWords))
  .catch(next);
});

