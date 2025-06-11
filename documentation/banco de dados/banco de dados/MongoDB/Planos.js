// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('Pilates');

// Create a new document in the collection.
db.getCollection('Planos').insertOne({
    _id: ObjectId("67f0830ed5ffb65cce5d56ed"),
    nome: "Plano Trimestral 2x/semana",
    periodo: "trimestral",
    frequencia: "2x/semana",
    valor_mensal: 200,
    valor_total: 600,
    politica_cancelamento: "Proporcional ao uso até o momento do cancelamento"
});
