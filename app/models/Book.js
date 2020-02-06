let fs = require('fs'),
    PersonModel = require(process.cwd() + "/app/models/Person.js");

// global book array
let books = []

/**
 * Book cst
 */
exports.Book = function Book(isbn, title, authors, price) {
    this.isbn = isbn;
    this.title = title;
    this.authors = authors;
    this.price = price;

    this.toString = function() {
        return this.isbn + ", " + this.title + ", " + this.authors + ", " + this.price;
    }
};

/**
 * Init a Book object array
 *
 * @param data data to construct Book object
 */
exports.loadBooks = function () {
    if (fs.existsSync('books.json')) {
        books = JSON.parse(fs.readFileSync("books.json"));
    }
    return books;
};

/**
 * Save a Book object array
 */
exports.saveBooks = function () {
    fs.writeFileSync("books.json", JSON.stringify(books));
    return books;
};

/**
 * Get all Book objects
 */
exports.getBooks = function (callback) {
    callback(null,books);
};
