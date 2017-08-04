const {STRING, INTEGER, TEXT} = require('sequelize');
const db = require('../db');

const Book = db.define('book', {
    title: {
      type: STRING,
      allowNull: false
    },
    year: {
      type: INTEGER,
      allowNull: false
    },
    coverURL: {
      type: STRING,
      defaultValue: '/img/cover.png'
    },
    wordCount: {
      type: INTEGER,
      validate: {
        min: 0
      }
    },
    pgURL: {
      type: TEXT
    }
  }
)

module.exports = Book
