export default {
    authenticate: '/auth',
    refreshToken: '/refresh',
    facebookLogin: '/login/facebook',
    facebookRedirect: '/login/facebook/callback',
    twitterLogin: '/login/twitter',
    googleLogin: '/login/google',
    login: '/login',

    getProducts: '/api/:db?/products',
    getProduct: '/api/:db?/products/:id',
    getReviews: '/api/:db?/products/:id/reviews',
    addProduct: '/api/:db?/products',
    deleteProduct: '/api/products/:id',

    getUsers: '/api/:db?/users',
    deleteUser: '/api/users/:id',

    getCities: '/api/cities',
    addCity: '/api/cities',
    updateCity: '/api/cities/:id',
    deleteCity: '/api/cities/:id'
}
