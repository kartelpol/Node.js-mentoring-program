export default function parseQuery(err, req, res, next) {
    if (err) throw err;

    req.parsedQuery = req.query;
    next();
}