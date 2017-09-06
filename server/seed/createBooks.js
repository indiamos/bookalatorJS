const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const db = require('../db');

const Book = db.model('book');

// the natural-gutenberg module supplies a small corpus
const naturalGutenberg = require('natural-gutenberg');

// additional seed books can be added by placing the text files in
// /server/seed/corpus/ and using convertToString() to import them.
function convertToString(filename) {
  return fs.readFileSync(path.join(__dirname, '/corpus/', filename)).toString();
}

function generateBooks() {
  const books = [];
  books.push(Book.build({
    title: 'Emma',
    year: 1815,
    text: naturalGutenberg['austen-emma'],
    wordCount: 160998,
    coverURL: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/EmmaTitlePage.jpg',
    pgURL: 'http://www.gutenberg.org/ebooks/158',
    wikipediaURL: 'https://en.wikipedia.org/wiki/Emma_(novel)',
  }));

  books.push(Book.build({
    title: 'Persuasion',
    year: 1818,
    text: naturalGutenberg['austen-persuasion'],
    wordCount: 83659,
    coverURL: 'https://upload.wikimedia.org/wikipedia/commons/6/68/NorthangerPersuasionTitlePage.jpg',
    pgURL: 'http://www.gutenberg.org/ebooks/105',
    wikipediaURL: 'https://en.wikipedia.org/wiki/Persuasion_(novel)',
  }));

  books.push(Book.build({
    title: 'Sense and Sensibility',
    year: 1811,
    text: naturalGutenberg['austen-sense'],
    wordCount: 119957,
    coverURL: 'https://upload.wikimedia.org/wikipedia/commons/9/96/SenseAndSensibilityTitlePage.jpg',
    pgURL: 'http://www.gutenberg.org/ebooks/161',
    wikipediaURL: 'https://en.wikipedia.org/wiki/Sense_and_Sensibility',
  }));

  books.push(Book.build({
    title: 'The Ball and The Cross',
    year: 1909,
    text: naturalGutenberg['chesterton-ball'],
    wordCount: 82214,
    coverURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Chesterton_-_The_Ball_and_the_Cross.djvu/page1-766px-Chesterton_-_The_Ball_and_the_Cross.djvu.jpg',
    pgURL: 'http://www.gutenberg.org/ebooks/5265',
    wikipediaURL: 'https://en.wikipedia.org/wiki/The_Ball_and_the_Cross',
  }));

  books.push(Book.build({
    title: 'The Wisdom of Father Brown',
    year: 1914,
    text: naturalGutenberg['chesterton-brown'],
    wordCount: 72372,
    coverURL: '/img/cover.png',
    pgURL: 'http://www.gutenberg.org/ebooks/223',
    wikipediaURL: 'https://en.wikipedia.org/wiki/Father_Brown',
  }));

  books.push(Book.build({
    title: 'The Man Who Was Thursday: A Nightmare',
    year: 1908,
    text: naturalGutenberg['chesterton-thursday'],
    wordCount: 58299,
    coverURL: 'https://upload.wikimedia.org/wikipedia/en/0/06/Manwhowasthursday.jpg',
    pgURL: 'http://www.gutenberg.org/ebooks/1695',
    wikipediaURL: 'https://en.wikipedia.org/wiki/The_Man_Who_Was_Thursday',
  }));

  books.push(Book.build({
    title: 'The Parent’s Assistant',
    year: 1908,
    text: naturalGutenberg['chesterton-thursday'],
    wordCount: 167714,
    coverURL: 'http://www.gutenberg.org/cache/epub/3655/pg3655.cover.medium.jpg',
    pgURL: 'http://www.gutenberg.org/ebooks/3655',
    wikipediaURL: 'https://en.wikipedia.org/wiki/The_Parent%27s_Assistant',
  }));

  books.push(Book.build({
    title: 'Herland',
    year: 1915,
    text: convertToString('gilman-herland.txt'),
    wordCount: 58299,
    coverURL: '/img/cover.png',
    pgURL: 'http://www.gutenberg.org/ebooks/32',
    wikipediaURL: 'https://en.wikipedia.org/wiki/Herland_(novel)',
  }));

  books.push(Book.build({
    title: 'Scaramouche: A Romance of the French Revolution',
    year: 1921,
    text: convertToString('sabatini-scaramouche.txt'),
    wordCount: 126511,
    coverURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Scaramouche.djvu/page7-440px-Scaramouche.djvu.jpg',
    pgURL: 'http://www.gutenberg.org/ebooks/1947',
    wikipediaURL: 'https://en.wikipedia.org/wiki/Scaramouche_(novel)',
  }));

  books.push(Book.build({
    title: 'The Tragedy of Julius Caesar',
    year: 1599,
    text: naturalGutenberg['shakespeare-caesar'],
    wordCount: 20523,
    coverURL: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Brutus_and_the_Ghost_of_Caesar_1802.jpg',
    pgURL: 'http://www.gutenberg.org/ebooks/1120',
    wikipediaURL: 'https://en.wikipedia.org/wiki/Julius_Caesar_(play)',
  }));

  books.push(Book.build({
    title: 'The Tragedy of Hamlet, Prince of Denmark',
    year: 1599,
    text: naturalGutenberg['shakespeare-hamlet'],
    wordCount: 29694,
    coverURL: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Edwin_Booth_Hamlet_1870.jpg',
    pgURL: 'http://www.gutenberg.org/ebooks/1524',
    wikipediaURL: 'https://en.wikipedia.org/wiki/Hamlet',
  }));

  books.push(Book.build({
    title: 'The Tragedy of Macbeth',
    year: 1603,
    text: naturalGutenberg['shakespeare-macbeth'],
    wordCount: 17823,
    coverURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Thomas_Keene_in_Macbeth_1884_Wikipedia_crop.png/1024px-Thomas_Keene_in_Macbeth_1884_Wikipedia_crop.png',
    pgURL: 'http://www.gutenberg.org/ebooks/2264',
    wikipediaURL: 'https://en.wikipedia.org/wiki/Macbeth',
  }));

  return books;
}

function createBooks() {
  return Promise.mapSeries(generateBooks(), book => book.save())
    .then(() => console.log('createBooks supposedly resolved…'));
}

module.exports = createBooks;
