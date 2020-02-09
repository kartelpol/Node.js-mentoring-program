module.exports.getUsers = getUsers;

function getUsers(req, res) {
    res.json(req.models);
}
