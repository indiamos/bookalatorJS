const router = require('express').Router()
const { Book, Word } = require('../db/models')
module.exports = router;

// wordTokenizer from the natural module splits a string up into words and returns an array. It may not be very intelligent about apostrophes.
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
// console.log(tokenizer.tokenize("your dog has fleas."));

// GET      /api/books/               // returns metadata for all books
// POST     /api/books/               // creates a new book
// GET      /api/books/:bookId        // returns metadata for one specific book
// PUT      /api/books/:bookId        // updates a book
// DELETE   /api/books/:bookId        // deletes a book
// GET      /api/books/:bookId/:word  // returns all the sentences in a specific book that contain a particular word
// GET      /api/books/:bookId/words  // returns a list of all words in a book

// GET /api/books/
router.get('/', (req, res, next) => {
  Book.findAll()
  .then(books => res.json(books))
  .catch(next);
});

// POST /api/books/
router.post('/', (req, res, next) => {
  Book.create(req.body)
  .then(book => res.status(201).json(book))
  .catch(next);
});

// GET /api/books/:bookId
router.get('/:bookId', (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
  .then(book => res.json(book))
  .catch(next);
});

// PUT /api/books/:bookId
router.put('/:bookId', (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
  .then(book => book.update(req.body))
  .then(updated => {
    res.send({ message: 'Updated sucessfully', updated.dataValues })
  })
  .catch(next);
});

// DELETE /api/books/:bookId
router.delete('/:bookId', (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
  .then(foundBook => foundBook.destroy())
  .then(result => {
    res.send({ message: 'Deleted successfully' })
  })
  .catch(next);
});

// ------------------------ BOOK-WORD ROUTES -----------------------------------

// Given a lump of text, return an array of its sentences.
// It would probably be a good idea to store this in the database.
function sentencize(text) {
  return text.match( /[^\.!\?]+[\.!\?]+/gi );
};

// Given a lump of text and a word to search for, return an array of sentences that contain the word.
// It might be a good idea to store these results in the database, for faster subsequent lookups.

function findSentences(text, word) {
  return sentencize(text).filter(sentence => {
    return sentence.trim().indexOf(word) > -1;
  });
};

// GET /api/books/:bookId/:word
// Returns an array of all sentences in a given book that contain a given word.
router.get('/:bookId/:word', (req, res, next) => {
  const id = req.params.bookId;
  const word = req.params.word;
  Book.findById(id)
  .then(foundBook => findSentences(foundBook.text, word))
  .then(foundsentences => res.json(foundsentences))
  .catch(next);
});

// GET /api/books/:bookId/words
// Returns a list of all words in a book.
// Should check whether the book has already been tokenized.
// If true, retrieve existing word list.
// If false, post the array to the word table.
router.get('/:bookId/words', (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
  .then(foundBook => tokenizer.tokenize(foundBook))
  .then(wordArray => res.json(wordArray))
  .catch(next);
});

