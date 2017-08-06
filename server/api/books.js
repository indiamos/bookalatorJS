const router = require('express').Router()
const { Book, Sentence, Word } = require('../db/models')
module.exports =  router;

const Promise = require('bluebird');

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

// Either GET or POST on /api/books/:bookId/sentences will create a sentenceArray if one doesn't yet exist. The difference is whether you get a saucy response.

// GET /api/books/:bookId/sentences
// Returns all of a book’s sentences
router.get('/:bookId/sentences', (req, res, next) => {
  // 1. get the book’s text
  Book.findById(req.params.bookId)
  // 2. tokenize the text
  .then(foundBook => {
    let sentenceArray;
    if(foundBook.sentencesTokenized) {
      sentenceArray = foundBook.sentenceArray; // I'm a teapot
    } else {
      sentenceArray = sentenceTokenizer.tokenize(foundBook.text);
      foundBook.update({
        sentenceArray,
        sentencesTokenized: true
      })
    }
    return sentenceArray;
  // 3. build an array of objects
  })
  .then(allSentences => res.json(allSentences))
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
      res.status(418).json(foundBook.sentenceArray); // I'm a teapot
    }
    let sentenceArray = sentenceTokenizer.tokenize(foundBook.text);
    foundBook.update({
      sentenceArray,
      sentencesTokenized: true
    })
    return sentenceArray;
  // 3. build an array of objects
  // This whole step is based on the process in the seed file, which in turn is based on the boilermaker repo. Which is why it’s so fucking convoluted.
  // .then(sentenceArray => {

    // Scrapped buildSentences() because handling so many rows crashed Node.
    // function buildSentences() {
    //   let sentenceBuilders = [];
    //   for(let i = 0; i < sentenceArray.length; i++) {
    //     sentenceBuilders.push(Sentence.build({
    //       sentence: sentenceArray[i],
    //       index: i,
    //       bookId: req.params.bookId,
    //     }));
    //   }
    //   return sentenceBuilders;
    // }

  //   function createSentences() {
  //     // TypeError: Promise.map is not a function
  //     return Promise.map(buildSentences(), function (sentence) {
  //       return sentence.save();
  //     });
  //   }

  //   function postSentences() {
  //     return Promise.all([createSentences()]); // this doesn't need to be a Promise.all
  //   }
  // // 4. post the built objects
  //   return postSentences();
  })
  .then(postedSentences => res.status(201).json(postedSentences))
  .catch(next);
});

// GET /api/books/:bookId/sentences/:word
// Returns all of a book’s sentences that contain a given word
router.get('/:bookId/sentences/:word', (req, res, next) => {
  // Sentence.findAll({
  //   where: {
  //     bookId: req.params.bookId
  //   }
  // })
  Book.findById(req.params.bookId).sentenceArray

  .then(bookSentences => bookSentences.filter(sentence => {
    return sentence.indexOf(req.params.word) > -1;
  }))
  .then(wordSentences => res.json(wordSentences))
  .catch(next);
});

// ------------------------ BOOK-WORD ROUTES -----------------------------------

// GET    /api/books/:bookId/words            // returns all words in a book
// POST   /api/books/:bookId/words            // stores all of a book’s words

// Either GET or POST on /api/books/:bookId/words will create a wordMap object if one doesn't yet exist. The difference is whether you get a saucy response.

function mapWords(arr) {
  let map = {};
  for(let word of arr) {
    map[word] = map[word] + 1 || 1;
  }
  return JSON.stringify(map);
}
// GET /api/books/:bookId/words
// Returns a list of all words in a book.
// If the book has already been tokenized, retrieve the existing list.
// Otherwise, condense the array into an object, post it to the book’s `wordMap` field, and then return the wordMap.
router.get('/:bookId/words', (req, res, next) => {
  // 1. Get the book object
  Book.findById(req.params.bookId)
  .then(foundBook => {
    let wordMap;
  // 2. Check whether it's already been tokenized
    if(foundBook.wordsTokenized) {
      wordMap = foundBook.wordMap;
    } else {
  // 3. Tokenize the text
      let wordArray = wordTokenizer.tokenize(foundBook.text);
      wordMap = mapWords(wordArray);
      foundBook.update({
        wordMap,
        wordsTokenized: true,
        wordCount: wordArray.length,
        uniqueCount: Object.keys(wordMap).length
      })
    }
    return wordMap;
  })
  .then(allWords => res.send(allWords))
  .catch(next);
});

// POST /api/books/:bookId/words
// Stores all of a book’s words
// If the book has already been tokenized, say you’re a teapot.
// Otherwise, post the array to the book’s `wordArray` field.
router.post('/:bookId/words', (req, res, next) => {
  // 1. Get the book object
  Book.findById(req.params.bookId)
  .then(foundBook => {
  // 2. Check whether it's already been tokenized
    if(foundBook.wordsTokenized) {
      res.status(418).json(foundBook.wordMap); // I'm a teapot
    }
  // 3. Tokenize the text
      let wordArray = wordTokenizer.tokenize(foundBook.text);
      let wordMap = mapWords(wordArray);
      foundBook.update({
        wordMap,
        wordsTokenized: true,
        wordCount: wordArray.length,
        uniqueCount: Object.keys(wordMap).length
      })
    return wordMap;
  })
  .then(postedWords => res.status(201).send(postedWords))
  .catch(next);
});
