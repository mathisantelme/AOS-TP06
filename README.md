# Architecture Orientée Service - Services **REST**

## 1 - Environement de travail

Pour ce TP nous allons utiliser Node.js qui est déjà installé sur l'image virtualisée Ubuntu (<!-- TODO: tuto installation node.js -->). Le développement s'appuiera sur le module **Restify**. Pour tester le service on utilisera l'outil **cURL**.

## 2 - Gestion élémentaire des livres via une API REST

### 2.1 - Spécifications

Nous allons reprendre les spécifications du TP5 sur la gestion de livres en effectuant une seule modification: la suppression de tous les livres ne sera plus possible, il sera nécessaire de founir l'identifiant de la ressource lors de l'utilisation de **DELETE**.

| Méthode | Route             | Commentaire                                                                           |
| ------- | ----------------- | ------------------------------------------------------------------------------------- |
| GET     | /api/book/{isbn}? | Le paramètre isbn est optionel, si il est absent, l'ensemble des livres sera retourné |
| POST    | /api/book         | Création d'un livre avec l'isbn, le titre, le nom de l'auteur et le prix              |
| PUT     | /api/book/{isbn}  | Modification de informations d'un livre, excepté son isbn                             |
| DELETE  | /api/book/{isbn}  | Permet de supprimer un livre grace à son identifiant                                  |

### 2.2 - Mise en oeuvre

Récupérer sur Moodle l'archive TP_restify.zip. Vous remarquerez différents répertoires dans l'arboresence:

- *core* contient les éléments principaux de l'application, dans notre cas le routeur (*router.js*);
- *controllers* contient les controleurs (au sens [**MVC**](https://fr.wikipedia.org/wiki/Mod%C3%A8le-vue-contr%C3%B4leur) de l'architecture);
- *models* contient les classes "métier" représentant les données à traiter dans l'application;

Une fois l'archive décompressée, utiliser `npm install` pour installer les modules nécessaires au projet.
Compléter les fichiers *Book.js* et *BookController.js* pour les tests présents dans le fichier *client_test_books.js* (présents dans le répertoire *tests*) fonctionnent correctement. Le code tel qu'il vous est fourni permet uniquement de valider le premier test.

Voici la procédure de test:

1. Déplacer le fichier *books.js* du répertoire *data* vers la racine du projet;
2. Lancer le service dans un terminal (`node server.js`);
3. Lancer le client dans un terminal (`node client.js`);