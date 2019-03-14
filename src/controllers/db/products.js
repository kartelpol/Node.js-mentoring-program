import {getModels, getURLParam} from './utils';

export const queries = {
    postgres: {
        getProducts: (req) => getModels(req).Product.findAll(),
        getProductById: (req) => getModels(req).Product.findAll({
            where: {
                id: getURLParam(req, 'id')
            }
        }),
        addProduct: (req) => getModels(req).Product.create({
            name: req.body.name
        }, {}),
        getProductReviews: (req) => getModels(req).Review.findAll({
            where: {
                productId: getURLParam(req, 'id')
            }
        })
    },
    mongo: {
        getProducts: (req) => getModels(req).Product.find({}),
        getProductById: (req) => getModels(req).Product.findById(getURLParam(req, 'id')),
        addProduct: (req) => getModels(req).Product.create({
            name: req.body.name
        }),
        getProductReviews: (req) => getModels(req).Product.findById(getURLParam(req, 'id'), 'reviews'),
        deleteProduct: (req) => getModels(req).Product.deleteOne({
            _id: getURLParam(req, 'id')
        }),
    }
};

