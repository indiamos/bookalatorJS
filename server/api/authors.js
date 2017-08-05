const router = require('express').Router()
const { Author } = require('../db/models')
const { Book } = require('../db/models')
module.exports = router;

// GET      /api/authors/                   // returns all author objects
// POST     /api/authors/                   // creates a new author
// GET      /api/authors/:authorId          // returns metadata for one specific author
// PUT      /api/authors/:authorId          // updates an author
// DELETE   /api/authors/:authorId          // deletes an author
// GET      /api/authors/:authorId/books    // returns all book objects by a specific author

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
  const id = req.params.authorId;
  Author.findById(id)
    .then(author => res.json(author))
    .catch(next);
});

// PUT /api/authors/:authorId
router.put('/:authorId', (req, res, next) => {
  const id = req.params.authorId;
  Author.findById(id)
    .then(author => author.update(req.body))
    .then(updated => {
      res.send({ message: 'Updated sucessfully', updated.dataValues })
    })
    .catch(next);
});

// DELETE /api/authors/:authorId
router.delete('/:authorId', (req, res, next) => {
  const id = req.params.authorId;
  Author.findById(id)
    .then(foundAuthor => foundAuthor.destroy())
    .then(result => {
      res.send({ message: 'Deleted successfully' })
    })
    .catch(next);
});

// GET /api/authors/:authorId/books
router.get('/:authorId/books', (req, res, next) => {
  const id = req.params.authorId;
  Book.findAll({
      include: [model: Author, as: 'Works']
    })
    .then(author => res.json(author))
    .catch(next);
});
