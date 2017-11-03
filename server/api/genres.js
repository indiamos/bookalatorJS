const router = require('express').Router();
const { Book, Genre } = require('../db/models');

module.exports = router;

// GET      /api/genres/                // returns all genre objects
// POST     /api/genres/                // creates a new genre
// GET      /api/genres/:genreId        // returns a given genre object
// PUT      /api/genres/:genreId        // updates a genre
// DELETE   /api/genres/:genreId        // deletes a genre
// GET      /api/genres/:genreId/books  // returns all book objects having a given genre

// GET /api/genres/
// POST /api/genres/
router.route('/')
  .get((req, res, next) => Genre.findAll()
    .then(genres => res.json(genres))
    .catch(next))
  .post((req, res, next) => Genre.create(req.body)
    .then(genre => res.status(201).json(genre))
    .catch(next));

// GET /api/genres/:genreId
// PUT /api/genres/:genreId
// DELETE /api/genres/:genreId
router.route('/:genreId')
  .get((req, res, next) => Genre.findById(req.params.genreId)
    .then(genre => res.json(genre))
    .catch(next))
  .put((req, res, next) => Genre.findById(req.params.genreId)
    .then(genre => genre.update(req.body), {
      returning: true,
      plain: true,
    })
    .then((updated) => {
      const revised = updated.dataValues; // putting this value directly in line 39 errors
      res.send({ message: 'Updated sucessfully', revised });
    })
    .catch(next))
  .delete((req, res, next) => Genre.findById(req.params.genreId)
    .then(foundGenre => foundGenre.destroy())
    .then(() => res.send({ message: 'Deleted successfully' }))
    .catch(next));

// GET /api/genres/:genreId/books
router.get('/:genreId/books', (req, res, next) => Book.findAll({
  include: [
    {
      model: Genre,
      where: {
        id: req.params.genreId,
      },
    },
  ],
})
  .then(genre => res.json(genre))
  .catch(next));
