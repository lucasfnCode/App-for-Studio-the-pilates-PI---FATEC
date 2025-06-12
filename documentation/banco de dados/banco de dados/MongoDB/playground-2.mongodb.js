/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.


// The current database to use.
use('Pilates');

// Create a new collection.
db.getCollection('Aulas').insert([

    {
        "students": ["Jaciton", "Leite", "Aquino"],
        "studio": "Jhonathan",
        "instructor": "Maria",
        "day": "2025-06-04",
        "hours": "08:00",
        "status": "fechada",
        "presences": [],
        "type": "aula_flexivel",
        "isActive": 1
    }
]);

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
