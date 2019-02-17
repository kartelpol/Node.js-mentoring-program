require('http')
    .createServer((req, res) =>  req.pipe(res))
    .listen(8080);