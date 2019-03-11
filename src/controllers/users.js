import db from './db/users';

function getAll(req, res) {
    return db.getAll()
        .then(users => res.send(users))
        .catch(err => res.send(err));
}

export default {getAll};
