const MongoClient = require('mongodb').MongoClient;
const createCollection = require('./collections');

function getCollection(collection = 'cities') {
    return new Promise((resolve, reject) => {
        getDb()
            .then((db) => createCollection(collection, db))
            .then((cities) => resolve(cities))
            .catch(err => reject(err));
    });
}

function getDb() {
    return new Promise((resolve, reject) => {
        const url = 'mongodb://localhost:27017/market_db';

        MongoClient
            .connect(url, (err, client) => {
                if (err) reject(err);
                const db = client.db('market_db');
                resolve(db);
            });

    });
}

module.exports = getCollection;
