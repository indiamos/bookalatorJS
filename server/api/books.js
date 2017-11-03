const router = require('express').Router();
const natural = require('natural');
const { Book, Sentence, Word } = require('../db/models');

module.exports = router;

const wordTokenizer = new natural.WordTokenizer();
const sentenceTokenizer = new natural.SentenceTokenizer();

// GET    /api/books/                         // returns all book objects
// POST   /api/books/                         // creates a new book
// GET    /api/books/:bookId                  // returns one book object
// PUT    /api/books/:bookId                  // updates a book
// DELETE /api/books/:bookId                  // deletes a book
// GET    /api/books/:bookId/sentences        // returns all of a book’s sentences
// POST   /api/books/:bookId/sentences        // stores all of a book’s sentences
// GET    /api/books/:bookId/sentences/:word  // returns all of a book’s sentences
//                                               that contain a given word
// GET    /api/books/:bookId/words            // returns all words in a book
// POST   /api/books/:bookId/words            // stores all of a book’s words

// GET /api/books/
// POST /api/books/
// Books should be tokenized during the import process—probably as an afterCreate hook.
router.route('/')
  .get((req, res, next) => Book.findAll()
    .then(books => res.json(books))
    .catch(next))
  .post((req, res, next) => Book.create(req.body)
    .then(book => res.status(201).json(book))
    .catch(next));

// GET /api/books/:bookId
// PUT /api/books/:bookId
// DELETE /api/books/:bookId
router.route('/:bookId')
  .get((req, res, next) => Book.findById(req.params.bookId)
    .then(book => res.json(book))
    .catch(next))
  .put((req, res, next) => Book.findById(req.params.bookId)
    .then(book => book.update(req.body, {
      returning: true,
      plain: true,
    }))
    .then(updated => res.send({ message: 'Updated sucessfully', updated }))
    .catch(next))
  .delete((req, res, next) => Book.findById(req.params.bookId)
    .then(foundBook => foundBook.destroy())
    .then(() => res.send({ message: 'Deleted successfully' }))
    .catch(next));

// ----------------------- BOOK-SENTENCE ROUTES --------------------------------

// GET    /api/books/:bookId/sentences        // returns all of a book’s sentences
// POST   /api/books/:bookId/sentences        // stores all of a book’s sentences
// GET    /api/books/:bookId/sentences/:word  // returns all of a book’s sentences
//                                               that contain a given word

// Either GET or POST on /api/books/:bookId/sentences will create a sentenceArray
// if one doesn't yet exist. The difference is whether you get a saucy response.

// GET /api/books/:bookId/sentences
//   Returns all of a book’s sentences
// POST /api/books/:bookId/sentences
//   Stores all of a book’s sentences - should happen during the import process—
//   probably as an afterCreate hook.
router.route('/:bookId/sentences')
  // 1. get the book’s text
  .get((req, res, next) => Book.findById(req.params.bookId)
  // 2. tokenize the text
    .then((foundBook) => {
      let sentenceArray;
      if (foundBook.sentencesTokenized) {
        sentenceArray = foundBook.sentenceArray; // I'm a teapot
      } else {
        sentenceArray = sentenceTokenizer.tokenize(foundBook.text);
        foundBook.update({
          sentenceArray,
          sentencesTokenized: true,
        }, {
          returning: true,
          plain: true,
        });
      }
      return sentenceArray;
    // 3. build an array of objects
    })
    .then(allSentences => res.json(allSentences))
    .catch(next))
  // 1. get the book’s text
  .post((req, res, next) => Book.findById(req.params.bookId)
  // 2. tokenize the text
    .then((foundBook) => {
      let sentenceArray;
      let status;
      if (foundBook.sentencesTokenized) {
        sentenceArray = foundBook.sentenceArray;
        status = 218; // I'm a teapot
      } else {
        status = 201;
        sentenceArray = sentenceTokenizer.tokenize(foundBook.text);
        foundBook.update({
          sentenceArray,
          sentencesTokenized: true,
        }, {
          returning: true,
          plain: true,
        });
      }
      return { sentenceArray, status };
    })
    .then(({ sentenceArray, status }) => res.status(status).json(sentenceArray))
    .catch(next));

// GET /api/books/:bookId/sentences/:word
// Returns all of a book’s sentences that contain a given word
router.get('/:bookId/sentences/:word', (req, res, next) => {
  // Sentence.findAll({
  //   where: {
  //     bookId: req.params.bookId
  //   }
  // })
  Book.findById(req.params.bookId).sentenceArray
    .then(bookSentences => bookSentences.filter(sentence => sentence.indexOf(req.params.word) > -1))
    .then(wordSentences => res.json(wordSentences))
    .catch(next);
});

// ------------------------ BOOK-WORD ROUTES -----------------------------------

// GET    /api/books/:bookId/words            // returns all words in a book
// POST   /api/books/:bookId/words            // stores all of a book’s words

// Either GET or POST on /api/books/:bookId/words will create a wordMap object
// if one doesn't yet exist. The difference is whether you get a saucy response.

function mapWords(arr) {
  const map = {};
  arr.forEach((word) => {
    if (!Number(word)) {
      map[word] = map[word] + 1 || 1;
    }
  });
  return JSON.stringify(map);
}

// GET /api/books/:bookId/words
//   Returns a list of all words in a book.
//   If the book has already been tokenized, retrieve the existing list.
//   Otherwise, condense the array into an object, post it to the book’s `wordMap`
//   field, and then return the wordMap.
// POST /api/books/:bookId/words
//   Stores all of a book’s words
//   If the book has already been tokenized, say you’re a teapot.
//   Otherwise, post the array to the book’s `wordArray` field.
  // 1. Get the book object
router.route('/:bookId/words')
  .get((req, res, next) => Book.findById(req.params.bookId)
    .then((foundBook) => {
      let wordMap;
      // 2. Check whether it's already been tokenized
      if (foundBook.wordsTokenized) {
        wordMap = foundBook.wordMap;
      } else {
      // 3. Tokenize the text
        const wordArray = wordTokenizer.tokenize(foundBook.text);
        wordMap = mapWords(wordArray);
        foundBook.update({
          wordMap,
          wordsTokenized: true,
          wordCount: wordArray.length,
          uniqueCount: Object.keys(wordMap).length,
        }, {
          returning: true,
          plain: true,
        });
      }
      return wordMap;
    })
    .then(allWords => res.send(allWords))
    .catch(next))
  // 1. Get the book object
  .post((req, res, next) => Book.findById(req.params.bookId)
    .then((foundBook) => {
      let wordMap;
      let status;
      // 2. Check whether it's already been tokenized
      if (foundBook.wordsTokenized) {
        wordMap = foundBook.wordMap;
        status = 218;
      } else {
        status = 201;
        // 3. Tokenize the text
        const wordArray = wordTokenizer.tokenize(foundBook.text);
        wordMap = mapWords(wordArray);
        foundBook.update({
          wordMap,
          wordsTokenized: true,
          wordCount: wordArray.length,
          uniqueCount: Object.keys(wordMap).length,
        });
      }
      return { wordMap, status };
    })
    .then(({ wordMap, status }) => res.status(status).send(wordMap))
    .catch(next));
