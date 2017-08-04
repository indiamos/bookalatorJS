const {ENUM, INTEGER, STRING, TEXT} = require('sequelize');
const db = require('../db');

const Word = db.define('word', {
    word: {
      type: STRING,
      allowNull: false
    }
  }
)

module.exports = Word;
