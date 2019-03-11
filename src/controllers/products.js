import db from './db/products';

function getAll(req, res) {
    return db.getProducts()
        .then(products => res.send(products))
        .catch(err => res.send(err));
}

function get(req, res) {
    return db.getProductById(req.params.id)
        .then(product => res.send(product))
        .catch(err => res.send(err));
}

function add(req, res) {
    return db.addProduct(req.params.name)
        .then(product => res.json(product))
        .catch(err => res.send(err));
}

function getReviews(req, res) {
    return db.getProductReviews(req.params.id)
        .then(reviews => res.send(reviews))
        .catch(err => res.send(err));
}

export default {getAll, get, add, getReviews}
