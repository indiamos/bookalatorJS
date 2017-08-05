const router = require('express').Router()
const { Book, Sentence, Word } = require('../db/models')
module.exports =  router;

const natural = require('natural');
const wordTokenizer = new natural.WordTokenizer();
const sentenceTokenizer = new natural.SentenceTokenizer();

// GET    /api/books/                         // returns all book objects
// POST   /api/books/                         // creates a new book
// GET    /api/books/:bookId                  // returns one book object
// PUT    /api/books/:bookId                  // updates a book
// DELETE /api/books/:bookId                  // deletes a book
// GET    /api/books/:bookId/sentences        // returns all of a book’s sentences
// POST   /api/books/:bookId/sentences        // stores all of a book’s sentences
// GET    /api/books/:bookId/sentences/:word  // returns all of a book’s sentences that contain a given word
// GET    /api/books/:bookId/words            // returns all words in a book
// POST   /api/books/:bookId/words            // stores all of a book’s words

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

// ----------------------- BOOK-SENTENCE ROUTES --------------------------------

// GET    /api/books/:bookId/sentences        // returns all of a book’s sentences
// POST   /api/books/:bookId/sentences        // stores all of a book’s sentences
// GET    /api/books/:bookId/sentences/:word  // returns all of a book’s sentences that contain a given word

// GET /api/books/:bookId/sentences
// Returns all of a book’s sentences
router.get('/:bookId/sentences', (req, res, next) => {
  Sentence.findAll({
    where: {
      bookId: req.params.bookId
    }
  })
  .then(bookSentences => res.json(bookSentences))
  .catch(next);
});

// POST /api/books/:bookId/sentences
// Stores all of a book’s sentences - should happen during the import process—probably as an afterCreate hook.
router.post('/:bookId/sentences', (req, res, next) => {
  // 1. get the book’s text
  Book.findById(req.params.bookId)
  // 2. tokenize the text
  .then(foundBook => {
    if(foundBook.sentencesTokenized) {
      res.sendStatus(418)
    }
    return sentenceTokenizer.tokenize(foundBook.text)
  })
  // 3. build an array of objects
  // This whole step is based on the process in the seed file, which in turn is based on the boilermaker repo. Which is why it’s so fucking convoluted.
  .then(sentenceArray => {
    function buildSentences() {
      let sentenceBuilders = [];
      for(let i = 0; i < sentenceArray.length; i++) {
        sentenceBuilders.push(Sentence.build({
          sentence: sentenceArray[i],
          index: i,
          bookId: 'female',
        }));
      }
      return sentenceBuilders;
    }

    function createSentences() {
      return Promise.map(buildSentences(), function (sentence) {
        return sentence.save();
      });
    }

    function postSentences() {
      return Promise.all([createSentences()]); // this doesn't need to be a Promise.all
    }
  // 4. post the built objects
    return postSentences();
  })
  .then(postedSentences => res.status(201).json(postedSentences))
  .catch(next);
});

// GET /api/books/:bookId/sentences/:word
// Returns all of a book’s sentences that contain a given word
router.get('/:bookId/sentences/:word', (req, res, next) => {
  Sentence.findAll({
    where: {
      bookId: req.params.bookId
    }
  })
  .then(bookSentences => bookSentences.filter(sentence => {
    return sentence.indexOf(req.params.word) > -1;
  }))
  .then(wordSentences => res.json(wordSentences))
  .catch(next);
});

// ------------------------ BOOK-WORD ROUTES -----------------------------------

// GET    /api/books/:bookId/words            // returns all words in a book
// POST   /api/books/:bookId/words            // stores all of a book’s words

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

