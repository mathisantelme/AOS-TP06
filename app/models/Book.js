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
    let found = false;
    // on vérifie si un livre possèdant le meme isbn existe déjà dans les objets chargés, si c'est le cas, alors on annule la création
    books.forEach(book => {
        if (book.isbn == p_book.isbn)
            found = true;
    });

    if (found) {
        return callback(new errs.ConflictError("Book already present"));
    } else {
        // on ajout le livre s'il n'est pas déjà présent
        books.push(p_book);
        return callback(null, p_book);
    } 
};

/**
 * Create the specified book object
 */
exports.removeBook = function (callback, isbn) {
    let found = false;
    books.forEach(book => {
        if (book.isbn == p_book.isbn)
            found = true;
    });

    if (found) {
        return callback(new errs.ConflictError("Book already present"));
    } else {
        // on ajout le livre s'il n'est pas déjà présent
        books.push(p_book);
        return callback(null, p_book);
    } 
};

/**
 * Modify a book's values
 */
exports.modifyBook = function (callback, isbn, title, authors, price) {
    let tmpBook;
    let found = false;

    books.forEach(book => {
        if (book.isbn == isbn) {
            found = true;
           tmpBook = book; 
        }
    });
    if (found) {
        tmpBook.title = title;
        tmpBook.authors = authors;
        tmpBook.price = price;
        return callback(null, tmpBook);
    } else {
        return callback(new errs.ConflictError("Book not present"));
    }
};