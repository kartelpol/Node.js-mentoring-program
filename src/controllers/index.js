import productControllers from './products';
import userControllers from './users';
import { authenticationController, refreshTokenController, loginController, facebookLoginRedirectController } from './authentication';

export default {
    refreshToken: refreshTokenController,
    authentication: authenticationController,
    login: loginController,
    facebookRedirect: facebookLoginRedirectController,
    products: productControllers,
    user: userControllers,
}