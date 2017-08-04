const {STRING} = require('sequelize');
const db = require('../db');

const Genre = db.define('genre', {
    name: {
      type: STRING,
      allowNull: false
    }
  }
)

module.exports = Genre;
