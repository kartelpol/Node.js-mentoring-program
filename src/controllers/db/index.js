import * as _ from "lodash";
import {queries as productQueries} from './products';
import {queries as userQueries} from './users';
import {queries as cityQueries} from './cities';

const queries = {
    postgres: {...productQueries.postgres, ...userQueries.postgres, ...cityQueries.postgres},
    mongo: {...productQueries.mongo, ...userQueries.mongo, ...cityQueries.mongo}
};

export const getData = (path, req) => _.invoke(queries, `${req.context.db || req.context.DEFAULT_DB}.${path}`, req);
