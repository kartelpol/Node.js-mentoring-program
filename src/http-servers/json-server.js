const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        { color: 'blue'},
        { size: 'XL'},
    ]
};

require('http')
    .createServer((req, res) => {
        let data;

        try {
            data = JSON.stringify(product);
        } catch(e) {
            throw e;
        }

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
    })
    .listen(8080);