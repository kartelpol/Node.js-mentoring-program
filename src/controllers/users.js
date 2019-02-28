function getAll(req, res) {
    req.context.models.User.findAll()
        .then(users => res.send(users))
        .catch(err => res.send(err));
}

export default {getAll};
