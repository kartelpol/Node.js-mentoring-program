export const getModels = (req) => req.context.models[req.context.db] || req.context.models[req.context.DEFAULT_DB];

export const getURLParam = (req, name) => req.params[name];
