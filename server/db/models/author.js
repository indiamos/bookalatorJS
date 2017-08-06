const {ENUM, INTEGER, STRING} = require('sequelize');
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
    },
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
    pgURL: {
      type: STRING
    },
    wikipediaURL: {
      type: STRING
    }
  }
)

module.exports = Author;
