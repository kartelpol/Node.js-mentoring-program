import {getModels, getURLParam} from './utils';

export const queries = {
    postgres: {
        getAll: (req) => getModels(req).User.findAll()
    },
    mongo: {
        getAll: (req) => getModels(req).User.find({}),
        deleteUser: (req) => getModels(req).User.deleteOne({
            _id: getURLParam(req, 'id')
        }),
    }
};
