const { INTEGER, TEXT } = require('sequelize');
const db = require('../db');

const Sentence = db.define('sentence', {
  sentence: {
    type: TEXT,
    allowNull: false,
  },
  index: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = Sentence;
