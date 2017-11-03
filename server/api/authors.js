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
// POST /api/authors/
router.route('/')
  .get((req, res, next) => Author.findAll()
    .then(authors => res.json(authors))
    .catch(next))
  .post((req, res, next) => Author.create(req.body)
    .then(author => res.status(201).json(author))
    .catch(next));

// GET /api/authors/:authorId
// PUT /api/authors/:authorId
// DELETE /api/authors/:authorId
router.route('/:authorId')
  .get((req, res, next) => Author.findById(req.params.authorId)
    .then(author => res.json(author))
    .catch(next))
  .put((req, res, next) => Author.findById(req.params.authorId)
    .then(author => author.update(req.body, {
      returning: true,
      plain: true,
    }))
    .then(updated => res.send({ message: 'Updated sucessfully', updated }))
    .catch(next))
  .delete((req, res, next) => Author.findById(req.params.authorId)
    .then(foundAuthor => foundAuthor.destroy())
    .then(() => res.send({ message: 'Deleted successfully' }))
    .catch(next));

// GET /api/authors/:authorId/books
router.get('/:authorId/books', (req, res, next) => Book.findAll({
  include: [{
    model: Author,
    as: 'Creators',
    where: {
      id: req.params.authorId,
    },
  }],
})
  .then(author => res.json(author))
  .catch(next));
