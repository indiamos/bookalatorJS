const db = require('../db');
const User = db.model('user');

const Promise = require('bluebird');

function generateUsers() {
  let users = [User.build({
    firstName: 'India',
    lastName: 'Amos',
    email: 'iamos0@gmail.com',
    password: 'india',
    isAdmin: true,
    billingAddress: '5 Hanover Square',
    shippingAddress: '5 Hanover Square'
  })];
  return users;
}

function createUsers(){
  return Promise.map(generateUsers(), function(user) {
    return user.save();
  });
}

module.exports = createUsers;
