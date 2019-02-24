import * as express from 'express';
import passport from 'passport';
import routes from '../routes';
import controllers from '../controllers';

export default function initializeAuthRouter(SECRET_CODE, credentials) {
    const authRouter = express.Router();

    authRouter.post(routes.authenticate,  controllers.authentication(credentials, SECRET_CODE));
    authRouter.post(routes.refreshToken, controllers.refreshToken(credentials, SECRET_CODE));
    
    authRouter.get(routes.facebookLogin, passport.authenticate('facebook'));
    authRouter.get(routes.facebookRedirect, passport.authenticate('facebook'), controllers.facebookRedirect);
    authRouter.post(routes.login, passport.authenticate('local'), controllers.login);

    return authRouter;

}