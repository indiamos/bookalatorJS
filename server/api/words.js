const router = require('express').Router()
const { Book, Word } = require('../db/models')
module.exports = router;

// wordTokenizer from the natural module splits a string up into words and returns an array. It may not be very intelligent about apostrophes.
// const natural = require('natural');
// const tokenizer = new natural.WordTokenizer();
// console.log(tokenizer.tokenize("your dog has fleas."));

// GET /api/words/            // returns all words from all books in the collection!
// GET /api/words/:word       // returns all books that contain a given word
// GET /api/words/:word/lines // returns all sentences from all books that contain a given word

// GET /api/words/
router.get('/', (req, res, next) => {
  Word.findAll()
  .then(words => res.json(words))
  .catch(next);
});

// GET /api/words/:word
router.get('/:word', (req, res, next) => {
  Book.findAll({
    where: {
      word: req.params.wordId
    }
  })
  .then(word => res.json(word))
  .catch(next);
});

// GET /api/words/:word/lines
// Returns an array of all sentences in a given word that contain a given word.
router.get('/:word/lines', (req, res, next) => {
  Word.findById(req.params.wordId)
  .then(foundWord => findSentences(foundWord.text, req.params.word))
  .then(foundsentences => res.json(foundsentences))
  .catch(next);
});

// GET /api/words/:word/books
router.get('/:word/books', (req, res, next) => {
  Book.findAll({
    include: [
      model: Word,
      where: {
        word: req.params.word
      }
    ]
  })
  .then(books => res.json(books))
  .catch(next);
});
