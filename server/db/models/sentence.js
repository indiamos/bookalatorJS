const {INTEGER, STRING} = require('sequelize');
const db = require('../db');

const Sentence = db.define('sentence', {
    sentence: {
      type: STRING,
      allowNull: false
    },
    index: {
      type: INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    }
  }
)

module.exports = Sentence;
