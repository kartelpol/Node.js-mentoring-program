import {getData} from './db';

function getAll(req, res) {
    return getData('getProducts', req)
        .then(products => res.send(products))
        .catch(err => res.send(err));
}

function get(req, res) {
    return getData('getProductById', req)
        .then(product => res.send(product))
        .catch(err => res.send(err));
}

function add(req, res) {
    return getData('addProduct', req)
        .then(product => res.json(product))
        .catch(err => res.send(err));
}

function getReviews(req, res) {
    return getData('getProductReviews', req)
        .then(result => res.send(result.reviews.toString()))
        .catch(err => res.send(err));
}

function deleteProduct(req, res) {
    return getData('deleteProduct', req)
        .then(result => res.send(result))
        .catch(err => res.status(400).end(err.message))
}

export default {getAll, get, add, getReviews, delete: deleteProduct}
