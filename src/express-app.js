import * as express from 'express';
import routes from './routes';
import controllers from './controllers';
import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import verifyAuthorization from './middlewares/verifyAuthorization';

const SECRET_CODE = 'secret';
const credentials = {
    admin: {
        password: 'adminpass',
    }
}

const app = express();

app.use(cookieParser);
app.use(queryParser);
app.use(express.json());

initializeRouters();

function initializeRouters() {
    const authRouter = express.Router();
    const apiRouter = express.Router();

    app.use(authRouter);
    app.use(apiRouter);

    apiRouter.use(verifyAuthorization(credentials, SECRET_CODE));

    authRouter.post(routes.authenticate, controllers.authorization(credentials, SECRET_CODE));
    authRouter.post(routes.refreshToken, controllers.refreshToken(credentials, SECRET_CODE));

    apiRouter.get(routes.getProducts, controllers.products.getAll);
    apiRouter.get(routes.getProduct, controllers.products.get);
    apiRouter.get(routes.getReviews, controllers.products.getReviews);
    apiRouter.post(routes.addProduct, controllers.products.add);

    apiRouter.get(routes.getUsers, controllers.user.getAll);
}

export default app;