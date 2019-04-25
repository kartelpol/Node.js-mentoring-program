const getCollection = require('../mongo/mongodb_driver');
const http = require('http');

getCollection('cities')
    .then((collection) => {
        http.createServer(async (req, res) => {
            const index = Math.floor(Math.random() * collection.length);
            const data = collection[index];

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
        })
            .listen(8081, () => console.log("Server is listening on port 8081"));
    })
    .catch(err => console.log(err));

