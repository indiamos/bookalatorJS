const { STRING } = require('sequelize');
const db = require('../db');

const Word = db.define('word', {
  word: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Word;
