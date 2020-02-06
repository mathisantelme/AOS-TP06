let fs = require('fs');

// global person array
let persons = []

/**
 * Person cst
 */
exports.Person = function Person(id, firstname, lastname, books) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.books = books;

    this.toString = function() {
        return this.id + ", " + this.firstname + ", " + this.lastname + ", " + this.books;
    }
};

/**
 * Init a Person object array
 *
 * @param data to construct Person object
 */
exports.loadPersons = function () {
    if (fs.existsSync('persons.json')) {
        persons = JSON.parse(fs.readFileSync("persons.json"));
    }
    return persons;
};

/**
 * Save a Person object array
 */
exports.savePersons = function () {
    fs.writeFileSync("persons.json", JSON.stringify(persons));
    return persons;
};
