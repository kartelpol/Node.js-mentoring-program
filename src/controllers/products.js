function getAll(req, res) {
    res.send('ALL products');
}

function get(req, res) {
    res.send('SINGLE product');
}


function add(req, res) {
    res.send('ADDED product');
}

function getReviews(req, res) {
    res.send('Product reviews');
}

export default { getAll, get, add, getReviews}