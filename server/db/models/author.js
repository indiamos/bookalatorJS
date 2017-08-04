const {ENUM, INTEGER, STRING, TEXT} = require('sequelize');
const db = require('../db');

const Author = db.define('author', {
    firstName: {
      type: STRING,
      allowNull: false
    },
    lastName: {
      type: STRING,
      allowNull: false
    },
    gender: {
      type: ENUM,
      values: ['female', 'male', 'nonbinary']
    }
    birthYear: {
      type: INTEGER,
      allowNull: false
    },
    deathYear: {
      type: INTEGER,
      allowNull: false
    },
    imageURL: {
      type: STRING,
      defaultValue: '/img/person.png'
    },
    wikipediaURL: {
      type: TEXT
    }
  }
)

module.exports = Author;
