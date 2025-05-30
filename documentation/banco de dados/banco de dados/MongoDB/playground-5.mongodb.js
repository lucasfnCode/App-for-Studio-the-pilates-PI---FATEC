/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

use('Pilates');

// Create a new collection.
db.getCollection('Financeiro').insert([

    [{
        "_id": {
            "$oid": "67f08356d5ffb65cce5d56f6"
        },
        "controle_ganhos": 8000,
        "controle_gastos": 5000,
        "fundo_de_caixa": 1000,
        "inadimplentes": [
            {
                "nome": "José Lima",
                "valor": 250,
                "data_vencimento": "2025-03-30"
            }
        ],
        "cancelamentos_mes": 2,
        "novos_alunos_mes": 5
    }]
]);
// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
