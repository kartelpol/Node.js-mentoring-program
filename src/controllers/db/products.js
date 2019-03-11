function getProducts() {
    return req.context.models.Product.findAll();
}

function getProductById(id) {
    return req.context.models.Product.findAll({where: {id}});
}

function addProduct(name) {
    return req.context.models.Product.create({name}, {})
}

function getProductReviews(productId) {
    return req.context.models.Review.findAll({
        where: {productId}
    });
}

export default {getProducts, getProductById, addProduct, getProductReviews}
