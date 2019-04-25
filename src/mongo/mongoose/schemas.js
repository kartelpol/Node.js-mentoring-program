const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: String,
    email: {
        type: String,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    }
}, {
    validateBeforeSave: true,
    timestamp: true
});

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    reviews: {
        type: Number,
        default: 0
    }
}, {
    validateBeforeSave: true,
    timestamp: {createdAt: 'createdDate', updatedAt: 'updatedDate'}
});

const citySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    capital: Boolean,
    location: {
        lat: Number,
        long: Number
    },
}, {
    validateBeforeSave: true,
    timestamp: true
});

const schemas = {
    'User': userSchema,
    'Product': productSchema,
    'City': citySchema
};

export default schemas;
