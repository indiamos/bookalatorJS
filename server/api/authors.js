const router = require('express').Router();
const { Author, Book } = require('../db/models');

module.exports = router;

// GET      /api/authors/                   // returns all author objects
// POST     /api/authors/                   // creates a new author
// GET      /api/authors/:authorId          // returns a given author object
// PUT      /api/authors/:authorId          // updates an author
// DELETE   /api/authors/:authorId          // deletes an author
// GET      /api/authors/:authorId/books    // returns all book objects by a given author

// GET /api/authors/
router.get('/', (req, res, next) => {
  Author.findAll()
    .then(authors => res.json(authors))
    .catch(next);
});

// POST /api/authors/
router.post('/', (req, res, next) => {
  Author.create(req.body)
    .then(author => res.status(201).json(author))
    .catch(next);
});

// GET /api/authors/:authorId
router.get('/:authorId', (req, res, next) => {
  Author.findById(req.params.authorId)
    .then(author => res.json(author))
    .catch(next);
});

// PUT /api/authors/:authorId
router.put('/:authorId', (req, res, next) => {
  Author.findById(req.params.authorId)
    .then(author => author.update(req.body))
    .then((updated) => {
      const revised = updated.dataValues; // putting this value directly in line 39 errors
      res.send({ message: 'Updated sucessfully', revised });
    })
    .catch(next);
});

// DELETE /api/authors/:authorId
router.delete('/:authorId', (req, res, next) => {
  Author.findById(req.params.authorId)
    .then(foundAuthor => foundAuthor.destroy())
    .then((result) => {
      res.send({ message: 'Deleted successfully' });
    })
    .catch(next);
});

// GET /api/authors/:authorId/books
router.get('/:authorId/books', (req, res, next) => {
  Book.findAll({
    include: [
      {
        model: Author,
        as: 'Creators',
        where: {
          id: req.params.authorId,
        },
      },
    ],
  })
    .then(author => res.json(author))
    .catch(next);
});
