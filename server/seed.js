const db = require('./db');
const User = db.model('user');

const Promise = require('bluebird');
const chance = require('chance')(123);

function doTimes (n, fn) {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

// USERS

function generateUsers() {
  let users = [User.build({
    firstName: 'India',
    lastName: 'Amos',
    email: 'india@indiamos.com',
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

//SEEDING

function seed() {
  let arr = [createUsers()];
  return Promise.all(arr);
}

console.log('Syncing database');

db.sync({force: true})
.then(() => {
  console.log('Seeding database');
  return seed();
})
.then(function () {
  console.log('Seeding successful');
}, function (err) {
  console.error('Error while seeding');
  console.error(err.stack);
})
.finally(function () {
  db.close();
  return null;
});
