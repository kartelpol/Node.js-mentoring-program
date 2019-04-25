import {getData} from './db';

function getAll(req, res) {
    return getData('getCities', req)
        .then(cities => res.send(cities))
        .catch(err => res.status(400).send(err.message));
}

function add(req, res) {
    return getData('addCity', req)
        .then(city => res.json(city))
        .catch(err => res.status(400).send(err.message));
}

function update(req, res) {
    return getData('updateCity', req)
        .then(city => res.json(city))
        .catch(err => res.status(400).send(err.message));
}

function deleteCity(req, res) {
    return getData('deleteCity', req)
        .then(city => res.send(city))
        .catch(err => res.status(400).end(err.message))
}

export default {getAll, add, update, delete: deleteCity}
