import productControllers from './products';
import userControllers from './users';
import { authorizationController, refreshTokenController, loginController, facebookLoginController, twitterLoginController, googleLoginController } from './authorizaion';

export default {
    refreshToken: refreshTokenController,
    authorization: authorizationController,
    facebookLogin: facebookLoginController,
    twitterLogin: twitterLoginController,
    googleLogin: googleLoginController,
    login: loginController,
    products: productControllers,
    user: userControllers,
}