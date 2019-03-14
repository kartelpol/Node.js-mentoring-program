import * as _ from 'lodash';
import mongoose from 'mongoose';
import schemas from './schemas';
import data from '../seeders/data';

function createModels() {
    const models = {};
    _.forEach(schemas, (schema, key) => models[key] = mongoose.model(key, schema));

    return models;
}

function addValidation(models) {
    models.City.schema.path('capital').validate(async (value, respond) => {
        const country = await models.City.schema.path('country');

        if (value) {
            try {
                const capital = await models.City.findOne({
                    capital: value,
                    country: country
                });
                if (capital) respond(false)
            } catch (err) {
                throw err;
            }
        }
    }, 'The capital is already registered');
}

function fillDb(models) {
    const docs = [];

    _.forEach(data, (collectionData, key) => {
        const modelDocs = models[key].insertMany(collectionData);
        docs.push(modelDocs);
    });

    return Promise.all(docs);
}

function initialize() {
    mongoose.connect('mongodb://localhost:27017/market_db', {useNewUrlParser: true});

    const models = createModels();
    addValidation(models);
    return fillDb(models).then(() => models);
}

export default initialize;

