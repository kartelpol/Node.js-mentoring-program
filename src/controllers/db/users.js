function getAll() {
    return req.context.models.User.findAll()
}

export default {getAll};
