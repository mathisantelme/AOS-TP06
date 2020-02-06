let fs = require('fs'),
    PersonModel = require(process.cwd() + "/app/models/Person.js"),
    errs = require('restify-errors');

// global book array
let books = []

/**
 * Book constructor
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

/**
 * Get the specified Book object
 */
exports.getOneBook = function (callback, isbn) {
    books.forEach(book => {
        if (book.isbn == isbn)
            callback(null, book);
    });
};

/**
 * Create the specified book object
 */
exports.createBook = function (callback, p_book) {
    // on vérifie si un livre possèdant le meme isbn existe déjà dans les objets chargés, si c'est le cas, alors on annule la création
    books.forEach(book => {
        if (book.isbn == p_book.isbn)
            callback(new errs.ConflictError("Book already present"));
    });

    // on ajout le livre s'il n'est pas déjà présent
    books.push(p_book);
    callback(null, p_book);
}