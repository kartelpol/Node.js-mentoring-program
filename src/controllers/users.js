import {getData} from './db';

function getAll(req, res) {
    return getData('getAll', req)
        .then(users => res.send(users))
        .catch(err => res.send(err));
}

function deleteUser(req, res) {
    return getData('deleteUser', req)
        .then(result => res.send(result))
        .catch(err => res.status(400).end(err.message));
}

export default {getAll, delete: deleteUser};
