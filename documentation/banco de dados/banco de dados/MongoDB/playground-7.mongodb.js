/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

use('Pilates');

// Create a new collection.
db.getCollection('Alertas').insert([

    [{
        "_id": {
            "$oid": "67f0830ed5ffb65cce5d56ed"
        },
        "nome": "Plano Trimestral 2x/semana",
        "periodo": "trimestral",
        "frequencia": "2x/semana",
        "valor_mensal": 200,
        "valor_total": 600,
        "politica_cancelamento": "Proporcional ao uso até o momento do cancelamento"
    }]
]);
// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
