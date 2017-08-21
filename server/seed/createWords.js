// const axios = require('axios');
// const db = require('../db');
// const natural = require('natural');
// const Promise = require('bluebird');

// const Book = db.model('book');
// const Word = db.model('word');

// wordTokenizer from the natural module splits a string up into words and
// returns an array. It may not be very intelligent about apostrophes.
// const tokenizer = new natural.WordTokenizer();
// console.log(tokenizer.tokenize("your dog has fleas."));

// // Get an array of all the books that have just been imported.
// let books = Book.FindAll(); // This won't actually work; have to make an AJAX call.

// // For each book in the array, tokenize its text, add those words to the db,
// and add a connection row to the BooksWords table.
// function generateWords() {
//   const words = [];
//   wordList.forEach((word) => {
//     words.push(Word.build({ word }));
//   });
//   return words;
// }

// function createWords() {
//   return Promise.map(generateWords(), word => word.save());
// }

// module.exports = createWords;
