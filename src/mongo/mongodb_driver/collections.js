const collections = require('../seeders/data');

function createCollection(name, db) {
    return new Promise((resolve, reject) =>
        db.createCollection(name, {"capped": true, "size": 100000, "max": 5000},
            (err, results) => err ? reject(err) : resolve(db.collection(name)))
    ).then(collection => fillCollection(collection, collections[name]));
}

function fillCollection(collection, data) {
    return new Promise((resolve, reject) => collection.insertMany(data, (err, result) => err ? reject(err) : resolve(result.ops)));
}

module.exports = createCollection;
