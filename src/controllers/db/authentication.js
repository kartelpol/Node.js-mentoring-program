function getUserByCredentials(name, password) {
    return req.context.models.User.findAll({
        where: {
            name: name,
            password: password
        }
    }).then(users => users[0])
}

function setRefreshToken(user, token) {
    user.refreshToken = token;
    return user.save();
}

function getUserByRefreshToken(refreshToken) {
    return req.context.models.User.findAll({
        where: {
            refreshToken: refreshToken,
        }
    }).then(users => users[0]);
}

export default {getUserByCredentials, getUserByRefreshToken, setRefreshToken}
