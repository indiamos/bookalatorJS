const db = require('../db');
const Promise = require('bluebird');

const User = db.model('user');

function generateUsers() {
  const users = [User.build({
    firstName: 'India',
    lastName: 'Amos',
    email: 'iamos0@gmail.com',
    password: 'india',
    isAdmin: true,
    billingAddress: '5 Hanover Square',
    shippingAddress: '5 Hanover Square',
  })];
  return users;
}

function createUsers() {
  return Promise.map(generateUsers(), user => user.save());
}

module.exports = createUsers;
