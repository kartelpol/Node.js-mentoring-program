import {getModels, getURLParam} from './utils';

export const queries = {
    postgres: {},
    mongo: {
        getCities: req => getModels(req).City.find({}),
        addCity: req => getModels(req).City.create(req.body),//then(instance => instance.validate()),
        updateCity: req => getModels(req).City.findOneAndUpdate({
            _id: getURLParam(req, 'id')
        }, req.body, {
            new: true,
            upsert: true,
            runValidators: true,
        }),
        deleteCity: req => getModels(req).City.deleteOne({
            _id: getURLParam(req, 'id')
        })
    }
};
