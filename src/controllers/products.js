function getAll(req, res) {
    res.send('ALL products');
}

function get(req, res) {
    res.send(`SINGLE product by id: ${req.params.id}`);
}


function add(req, res) {
    res.send('ADDED product');
}

function getReviews(req, res) {
    res.send(`Product's with id: ${req.params.id} reviews`);
}

export default { getAll, get, add, getReviews}