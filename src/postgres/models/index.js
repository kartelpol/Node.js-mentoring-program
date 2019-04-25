'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/db.json')[env];
const db = {models: {}};

const getUser = require('./user');
const getProduct = require('./product');
const getReview = require('./review');

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const user = getUser(sequelize, Sequelize);
const product = getProduct(sequelize, Sequelize);
const review = getReview(sequelize, Sequelize);

db['User'] = user;
db['Product'] = product;
db['Review'] = review;

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
