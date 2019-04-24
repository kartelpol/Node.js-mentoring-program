import * as express from 'express';
import verifyAuthentication from '../middlewares/verifyAuthorization';
import routes from '../routes';
import controllers from '../controllers';

export default function initializeAPIRouter(SECRET_CODE) {
    const apiRouter = express.Router();
    //apiRouter.use(verifyAuthentication(SECRET_CODE)); // disabled to don't have to put JWT token with every query

    apiRouter.param('db', (req, res, next, db) => {
        const isDbExists = db === 'mongo' || db === 'postgres';
        req.context.db = isDbExists ? db : 'mongo';

        next();
    });

    apiRouter.get(routes.getProducts, controllers.products.getAll);
    apiRouter.get(routes.getProduct, controllers.products.get);
    apiRouter.get(routes.getReviews, controllers.products.getReviews);
    apiRouter.post(routes.addProduct, controllers.products.add);
    apiRouter.delete(routes.deleteProduct, controllers.products.delete);

    apiRouter.get(routes.getCities, controllers.cities.getAll);
    apiRouter.post(routes.addCity, controllers.cities.add);
    apiRouter.put(routes.updateCity, controllers.cities.update);
    apiRouter.delete(routes.deleteCity, controllers.cities.delete);

    apiRouter.get(routes.getUsers, controllers.users.getAll);
    apiRouter.delete(routes.deleteUser, controllers.users.delete);

    return apiRouter;
}
