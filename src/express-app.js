import * as express from 'express';
import passport from 'passport';
import Local from 'passport-local';
import routes from './routes';
import controllers from './controllers';
import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import { verifyAuthorization, passportLocal } from './middlewares/verifyAuthorization';

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
app.use(passport.initialize());

passportLocal(credentials);

initializeRouters();

function initializeRouters() {
    const authRouter = express.Router();
    const apiRouter = express.Router();

    app.use(authRouter);
    app.use(apiRouter);

    apiRouter.use(verifyAuthorization(credentials, SECRET_CODE));

    authRouter.post(routes.authenticate,  controllers.authorization(credentials, SECRET_CODE));
    authRouter.post(routes.refreshToken, controllers.refreshToken(credentials, SECRET_CODE));
    
    authRouter.post(routes.facebookLogin, controllers.facebookLogin(credentials));
    authRouter.post(routes.twitterLogin, controllers.twitterLogin(credentials));
    authRouter.post(routes.googleLogin, controllers.googleLogin(credentials));
    authRouter.post(routes.login, controllers.login(credentials));

    apiRouter.get(routes.getProducts, controllers.products.getAll);
    apiRouter.get(routes.getProduct, controllers.products.get);
    apiRouter.get(routes.getReviews, controllers.products.getReviews);
    apiRouter.post(routes.addProduct, controllers.products.add);

    apiRouter.get(routes.getUsers, controllers.user.getAll);
}

export default app;