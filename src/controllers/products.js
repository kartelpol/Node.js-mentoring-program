function getAll(req, res) {
    req.context.models.Product.findAll()
        .then(products => res.send(products))
        .catch(err => res.send(err));
}

function get(req, res) {
    req.context.models.Product.findAll({where: {name: req.params.name}})
        .then(product => res.send(product))
        .catch(err => res.send(err));
}

function add(req, res) {
    req.context.models.Product.create({
        name: req.params.name,
    }, {})
        .then(product => res.json(product))
        .catch(err => res.send(err));
}

function getReviews(req, res) {
    req.context.models.Review.findAll({
        where: {
            productId: req.params.id
        }
    })
        .then(reviews => res.send(reviews))
        .catch(err => res.send(err));
}

export default {getAll, get, add, getReviews}
