let fs = require('fs'),
    BookModel = require(process.cwd() + "/app/models/Book.js"),
    PersonModel = require(process.cwd() + "/app/models/Person.js"),
    Server = require(process.cwd() + "/app/core/router.js"),
    errs = require("restify-errors");

/**
 * Init book set.
 */
exports.initStorage = function () {
    let books = BookModel.loadBooks();
    console.log("Books loaded: %j", books);
};

/**
 * Save book set
 */
exports.saveStorage = function () {
    var data = BookModel.saveBooks();
    console.log("Data saved: %j", data);
}

/**
 * Returns the specified book (if exists) or all books if isbn is not provided.
 */
exports.getBook = function (req, res, next) {
    // console.log("getBook isbn = %j", req.params.isbn);

    var isbn = req.params.isbn;

    if (isbn == null) { // si l'isbn n'est pas présent alors on retourne tout les livres présents
        BookModel.getBooks(function (err, books) {
            if (err) {
                return next(err);
            } else {
                res.json(200, books);
                return next();
            }
        })
    } else { // si l'isbn est présent alors on retourne le livre spécifié
        BookModel.getOneBook(function (err, book) {
            if (err){
                return next(err);  
            } else {
                res.json(200, book);
                return next();
            }    
        }, isbn);
    }    
};

/**
 * Creates à new book using isbn, title, authorname and price
 */
exports.createBook = function (req, res, next) {
    var p_book = new BookModel.Book(req.body.isbn, req.body.title, req.body.authors, req.body.price);
    
    // on récupère les informations contenues par la requete
    BookModel.createBook(function (err, book) {
        if (err) {
            res.json(409);
            return next(err);
        } else {
            res.json(200, book);
            return next();
        }
    }, p_book);
};

/**
 * Modify a specified book
 */
exports.modifyBook = function (req, res, next) {
    BookModel.modifyBook(function (err, book) {
        if (err) {
            res.json(409);
            return next(err);
        }
        res.json(200, book);
        return next();
    }, req.body.isbn, req.body.title, req.body.authors, req.body.price);
}