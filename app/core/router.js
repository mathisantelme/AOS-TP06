let restify = require('restify'),
    errs = require('restify-errors'),
    fs = require('fs');

// To activate controllers
let controllers = {}
    , controllers_path = process.cwd() + '/app/controllers';

fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') !== -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
});

// helper function
exports.getServer = function() {
    return server;
};

// server creation
var server = restify.createServer();

// server configuration
server.use(restify.plugins.bodyParser());  // needed for body request parsing
server.use(restify.plugins.queryParser()); // needed for query parameter request parsing

// route configuration
// c'est ici que l'on lit les route aux fonctions
server.get("/api/book", controllers.BookController.getBook); // permet de retourner tous les livres présents
server.get("/api/book/:isbn", controllers.BookController.getBook); // permet de retourner un livre spécifique
server.post("/api/book", controllers.BookController.createBook); // permet la création d'un livre
server.put("/api/book/:isbn", controllers.BookController.modifyBook); // permet de modifier un livre spécifique
var port = process.env.PORT || 3000;

server.listen(port, function (err) {
    if (err)
        console.error(err)
    else {
        // pseudo persistence : load data from JSON files
        controllers.BookController.initStorage();
        controllers.PersonController.initStorage();
        console.log('App is ready at : ' + port);
    }
});

/** function called just before server shutdown
process.on('SIGINT', function () {
    // pseudo persistence : backup current data into JSON files
    controllers.BookController.saveStorage();
    controllers.PersonController.saveStorage();
    process.exit(0);
});
*/