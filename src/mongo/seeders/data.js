const collections = {
    City: [
        {
            name: 'Minsk',
            country: 'Belarus',
            capital: true,
            location: {
                lat: 52.097621,
                long: 23.7312
            }
        }, {
            name: 'LA',
            country: 'USA',
            capital: false,
            location: {
                lat: 52.097621,
                long: 23.7312
            }
        }
    ],
    User: [
        {
            name: 'admin',
            password: 'admin'
        }
    ],
    Product: [
        {
            name: 'mercedes',
            reviews: '3600'
        }
    ]
};

module.exports = collections;
