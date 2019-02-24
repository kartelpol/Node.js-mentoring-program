import * as express from 'express';
import verifyAuthentication from '../middlewares/verifyAuthorization';
import routes from '../routes';
import controllers from '../controllers';

export default function initializeAPIRouter(SECRET_CODE) {
    const apiRouter = express.Router();
    apiRouter.use(verifyAuthentication(SECRET_CODE));

    apiRouter.get(routes.getProducts, controllers.products.getAll);
    apiRouter.get(routes.getProduct, controllers.products.get);
    apiRouter.get(routes.getReviews, controllers.products.getReviews);
    apiRouter.post(routes.addProduct, controllers.products.add);

    apiRouter.get(routes.getUsers, controllers.user.getAll);

    return apiRouter;
}