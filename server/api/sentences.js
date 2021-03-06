const router = require('express').Router();
// const natural = require('natural');
const { Book, Word } = require('../db/models');

module.exports = router;

// const wordTokenizer = new natural.WordTokenizer();
// const sentenceTokenizer = new natural.SentenceTokenizer();

// GET /api/sentence/            // returns all sentences from all books in the collection!
// GET /api/sentences/:word       // returns all sentences from all books containing a given word

// GET /api/words/
// Returns all word objects from all books in the collection!
router.get('/', (req, res, next) => {
  Word.findAll()
    .then(words => res.json(words))
    .catch(next);
});

// GET /api/words/:word
// Returns all book objects that contain a given word
// router.get('/:word', (req, res, next) => {
//   Book.findAll({
//     where: {
//       word: req.params.wordId
//     }
//   })
//   .then(word => res.json(word))
//   .catch(next);
// });

router.get('/:word', (req, res, next) => {
  Book.findAll({
    include: [
      {
        model: Word,
        where: {
          word: req.params.word,
        },
      },
    ],
  })
    .then(books => res.json(books))
    .catch(next);
});

// GET /api/words/:word/lines
// Returns all sentence objects in the collection that contain a given word
// router.get('/:word/lines', (req, res, next) => {
//   const pattern = '[\b'+req.params.word+'|\b'+req.params.word+'s]'; // includes plurals, dumbly
//   Sentence.findAll({
//     where: {
//       $iRegexp: pattern
//     }
//   })
//   .then(foundSentences => res.json(foundSentences))
//   .catch(next);
// });
