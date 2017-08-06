const {ARRAY, BOOLEAN, STRING, INTEGER, TEXT} = require('sequelize');
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
    text: {
      type: TEXT
    },
    wordCount: {
      type: INTEGER,
      validate: {
        min: 0
      }
    },
    uniqueCount: {
      type: INTEGER,
      validate: {
        min: 0
      }
    },
    coverURL: {
      type: STRING,
      defaultValue: '/img/cover.png'
    },
    pgURL: {
      type: STRING
    },
    wikipediaURL: {
      type: STRING
    },
    sentencesTokenized: {
      type: BOOLEAN,
      defaultValue: false
    },
    wordsTokenized: {
      type: BOOLEAN,
      defaultValue: false
    },
    sentenceArray: {
      type: ARRAY(TEXT),
      defaultValue: []
    },
    wordMap: {
      type: TEXT,
      defaultValue: ''
    }
  }
)

module.exports = Book;
