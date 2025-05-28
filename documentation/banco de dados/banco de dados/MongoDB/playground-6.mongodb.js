/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

use('Pilates');

// Create a new collection.
db.getCollection('Modalidades').insert([

    [{
        "_id": {
            "$oid": "67f082f2d5ffb65cce5d56ea"
        },
        "nome": "Pilates",
        "descricao": "Exercícios de fortalecimento, flexibilidade e postura."
    }]
]);
// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
