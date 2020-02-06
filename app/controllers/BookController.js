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
    //console.log("getBook isbn = %j", req.params.isbn);
    BookModel.getBooks(function (err, books) {
        if (err) {
            return next(err);
        } else {
            res.json(200, books);
            return next();
        }
    })
};
